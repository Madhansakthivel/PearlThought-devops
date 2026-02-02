'use strict';

var chalk = require('chalk');
var semver$1 = require('semver');
var utils$1 = require('@strapi/utils');
var transformApi = require('../json/transform-api.js');
var file = require('../json/file.js');
require('node:path');
require('node:assert');
require('fs-extra');
var semver = require('../version/semver.js');
var range = require('../version/range.js');
require('fast-glob');
require('jscodeshift/src/Runner');
require('lodash/fp');
require('esbuild-register/dist/node');
var constants = require('../project/constants.js');
var utils = require('../error/utils.js');
var formats = require('../format/formats.js');
var codemodRunner = require('../codemod-runner/codemod-runner.js');

class Upgrader {
    getNPMPackage() {
        return this.npmPackage;
    }
    getProject() {
        return this.project;
    }
    getTarget() {
        return semver.semVerFactory(this.target.raw);
    }
    setRequirements(requirements) {
        this.requirements = requirements;
        return this;
    }
    setTarget(target) {
        this.target = target;
        return this;
    }
    syncCodemodsTarget() {
        // Extract the <major>.<minor>.<patch> version from the target and assign it to the codemods target
        //
        // This is useful when dealing with alphas, betas or release candidates:
        // e.g. "5.0.0-beta.951" becomes "5.0.0"
        //
        // For experimental versions (e.g. "0.0.0-experimental.hex"), it is necessary to
        // override the codemods target manually in order to run the appropriate ones.
        this.codemodsTarget = semver.semVerFactory(`${this.target.major}.${this.target.minor}.${this.target.patch}`);
        this.logger?.debug?.(`The codemods target has been synced with the upgrade target. The codemod runner will now look for ${formats.version(this.codemodsTarget)}`);
        return this;
    }
    overrideCodemodsTarget(target) {
        this.codemodsTarget = target;
        this.logger?.debug?.(`Overriding the codemods target. The codemod runner will now look for ${formats.version(target)}`);
        return this;
    }
    setLogger(logger) {
        this.logger = logger;
        return this;
    }
    onConfirm(callback) {
        this.confirmationCallback = callback;
        return this;
    }
    dry(enabled = true) {
        this.isDry = enabled;
        return this;
    }
    addRequirement(requirement) {
        this.requirements.push(requirement);
        const fRequired = requirement.isRequired ? '(required)' : '(optional)';
        this.logger?.debug?.(`Added a new requirement to the upgrade: ${formats.highlight(requirement.name)} ${fRequired}`);
        return this;
    }
    async upgrade() {
        this.logger?.info?.(`Upgrading from ${formats.version(this.project.strapiVersion)} to ${formats.version(this.target)}`);
        if (this.isDry) {
            this.logger?.warn?.('Running the upgrade in dry mode. No files will be modified during the process.');
        }
        const range$1 = range.rangeFromVersions(this.project.strapiVersion, this.target);
        const codemodsRange = range.rangeFromVersions(this.project.strapiVersion, this.codemodsTarget);
        const npmVersionsMatches = this.npmPackage?.findVersionsInRange(range$1) ?? [];
        this.logger?.debug?.(`Found ${formats.highlight(npmVersionsMatches.length)} versions satisfying ${formats.versionRange(range$1)}`);
        try {
            this.logger?.info?.(formats.upgradeStep('Checking requirement', [
                1,
                4
            ]));
            await this.checkRequirements(this.requirements, {
                npmVersionsMatches,
                project: this.project,
                target: this.target
            });
            this.logger?.info?.(formats.upgradeStep('Applying the latest code modifications', [
                2,
                4
            ]));
            await this.runCodemods(codemodsRange);
            // We need to refresh the project files to make sure we have
            // the latest version of each file (including package.json) for the next steps
            this.logger?.debug?.('Refreshing project information...');
            this.project.refresh();
            this.logger?.info?.(formats.upgradeStep('Upgrading Strapi dependencies', [
                3,
                4
            ]));
            await this.updateDependencies();
            this.logger?.info?.(formats.upgradeStep('Installing dependencies', [
                4,
                4
            ]));
            await this.installDependencies();
        } catch (e) {
            return erroredReport(utils.unknownToError(e));
        }
        return successReport();
    }
    async confirm(message) {
        if (typeof this.confirmationCallback !== 'function') {
            return true;
        }
        return this.confirmationCallback(message);
    }
    async checkRequirements(requirements, context) {
        for (const requirement of requirements){
            const { pass, error } = await requirement.test(context);
            if (pass) {
                await this.onSuccessfulRequirement(requirement, context);
            } else {
                await this.onFailedRequirement(requirement, error);
            }
        }
    }
    async onSuccessfulRequirement(requirement, context) {
        const hasChildren = requirement.children.length > 0;
        if (hasChildren) {
            await this.checkRequirements(requirement.children, context);
        }
    }
    async onFailedRequirement(requirement, originalError) {
        const errorMessage = `Requirement failed: ${originalError.message} (${formats.highlight(requirement.name)})`;
        const warningMessage = originalError.message;
        const confirmationMessage = `Ignore optional requirement "${formats.highlight(requirement.name)}" ?`;
        const error = new Error(errorMessage);
        if (requirement.isRequired) {
            throw error;
        }
        this.logger?.warn?.(warningMessage);
        const response = await this.confirmationCallback?.(confirmationMessage);
        if (!response) {
            throw error;
        }
    }
    async updateDependencies() {
        const { packageJSON, packageJSONPath } = this.project;
        const json = transformApi.createJSONTransformAPI(packageJSON);
        const dependencies = json.get('dependencies', {});
        const strapiDependencies = this.getScopedStrapiDependencies(dependencies);
        this.logger?.debug?.(`Found ${formats.highlight(strapiDependencies.length)} dependency(ies) to update`);
        strapiDependencies.forEach((dependency)=>this.logger?.debug?.(`- ${dependency[0]} (${dependency[1]} -> ${this.target})`));
        if (strapiDependencies.length === 0) {
            return;
        }
        strapiDependencies.forEach(([name])=>json.set(`dependencies.${name}`, this.target.raw));
        const updatedPackageJSON = json.root();
        if (this.isDry) {
            this.logger?.debug?.(`Skipping dependencies update (${chalk.italic('dry mode')})`);
            return;
        }
        await file.saveJSON(packageJSONPath, updatedPackageJSON);
    }
    getScopedStrapiDependencies(dependencies) {
        const { strapiVersion } = this.project;
        const strapiDependencies = [];
        // Find all @strapi/* packages matching the current Strapi version
        for (const [name, version] of Object.entries(dependencies)){
            const isScopedStrapiPackage = name.startsWith(constants.SCOPED_STRAPI_PACKAGE_PREFIX);
            const isOnCurrentStrapiVersion = semver.isValidSemVer(version) && version === strapiVersion.raw;
            if (isScopedStrapiPackage && isOnCurrentStrapiVersion) {
                strapiDependencies.push([
                    name,
                    semver.semVerFactory(version)
                ]);
            }
        }
        return strapiDependencies;
    }
    async installDependencies() {
        const projectPath = this.project.cwd;
        const packageManagerName = await utils$1.packageManager.getPreferred(projectPath);
        this.logger?.debug?.(`Using ${formats.highlight(packageManagerName)} as package manager`);
        if (this.isDry) {
            this.logger?.debug?.(`Skipping dependencies installation (${chalk.italic('dry mode')})`);
            return;
        }
        await utils$1.packageManager.installDependencies(projectPath, packageManagerName, {
            stdout: this.logger?.stdout,
            stderr: this.logger?.stderr
        });
    }
    async runCodemods(range) {
        const codemodRunner$1 = codemodRunner.codemodRunnerFactory(this.project, range);
        codemodRunner$1.dry(this.isDry);
        if (this.logger) {
            codemodRunner$1.setLogger(this.logger);
        }
        await codemodRunner$1.run();
    }
    constructor(project, target, npmPackage){
        this.project = project;
        this.npmPackage = npmPackage;
        this.target = target;
        this.syncCodemodsTarget();
        this.isDry = false;
        this.requirements = [];
        this.logger = null;
        this.confirmationCallback = null;
    }
}
/**
 * Resolves the NPM target version based on the given project, target, and NPM package.
 * If target is a SemVer, it directly finds it. If it's a release type (major, minor, patch),
 * it calculates the range of versions for this release type and returns the latest version within this range.
 */ const resolveNPMTarget = (project, target, npmPackage)=>{
    // Semver
    if (semver.isSemverInstance(target)) {
        const version = npmPackage.findVersion(target);
        if (!version) {
            throw new utils.NPMCandidateNotFoundError(target);
        }
        return version;
    }
    // Release Types
    if (semver.isSemVerReleaseType(target)) {
        const range$1 = range.rangeFromVersions(project.strapiVersion, target);
        const npmVersionsMatches = npmPackage.findVersionsInRange(range$1);
        // The targeted version is the latest one that matches the given range
        const version = npmVersionsMatches.at(-1);
        if (!version) {
            throw new utils.NPMCandidateNotFoundError(range$1, `The project is already up-to-date (${target})`);
        }
        return version;
    }
    throw new utils.NPMCandidateNotFoundError(target);
};
const upgraderFactory = (project, target, npmPackage)=>{
    const npmTarget = resolveNPMTarget(project, target, npmPackage);
    const semverTarget = semver.semVerFactory(npmTarget.version);
    if (semver$1.eq(semverTarget, project.strapiVersion)) {
        throw new Error(`The project is already using v${semverTarget}`);
    }
    return new Upgrader(project, semverTarget, npmPackage);
};
const successReport = ()=>({
        success: true,
        error: null
    });
const erroredReport = (error)=>({
        success: false,
        error
    });

exports.Upgrader = Upgrader;
exports.upgraderFactory = upgraderFactory;
//# sourceMappingURL=upgrader.js.map
