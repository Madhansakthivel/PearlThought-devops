import chalk from 'chalk';
import semver from 'semver';
import { packageManager } from '@strapi/utils';
import { createJSONTransformAPI } from '../json/transform-api.mjs';
import { saveJSON } from '../json/file.mjs';
import 'node:path';
import 'node:assert';
import 'fs-extra';
import { semVerFactory, isValidSemVer, isSemverInstance, isSemVerReleaseType } from '../version/semver.mjs';
import { rangeFromVersions } from '../version/range.mjs';
import 'fast-glob';
import 'jscodeshift/src/Runner';
import 'lodash/fp';
import 'esbuild-register/dist/node';
import { SCOPED_STRAPI_PACKAGE_PREFIX } from '../project/constants.mjs';
import { unknownToError, NPMCandidateNotFoundError } from '../error/utils.mjs';
import { version, highlight, versionRange, upgradeStep } from '../format/formats.mjs';
import { codemodRunnerFactory } from '../codemod-runner/codemod-runner.mjs';

class Upgrader {
    getNPMPackage() {
        return this.npmPackage;
    }
    getProject() {
        return this.project;
    }
    getTarget() {
        return semVerFactory(this.target.raw);
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
        this.codemodsTarget = semVerFactory(`${this.target.major}.${this.target.minor}.${this.target.patch}`);
        this.logger?.debug?.(`The codemods target has been synced with the upgrade target. The codemod runner will now look for ${version(this.codemodsTarget)}`);
        return this;
    }
    overrideCodemodsTarget(target) {
        this.codemodsTarget = target;
        this.logger?.debug?.(`Overriding the codemods target. The codemod runner will now look for ${version(target)}`);
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
        this.logger?.debug?.(`Added a new requirement to the upgrade: ${highlight(requirement.name)} ${fRequired}`);
        return this;
    }
    async upgrade() {
        this.logger?.info?.(`Upgrading from ${version(this.project.strapiVersion)} to ${version(this.target)}`);
        if (this.isDry) {
            this.logger?.warn?.('Running the upgrade in dry mode. No files will be modified during the process.');
        }
        const range = rangeFromVersions(this.project.strapiVersion, this.target);
        const codemodsRange = rangeFromVersions(this.project.strapiVersion, this.codemodsTarget);
        const npmVersionsMatches = this.npmPackage?.findVersionsInRange(range) ?? [];
        this.logger?.debug?.(`Found ${highlight(npmVersionsMatches.length)} versions satisfying ${versionRange(range)}`);
        try {
            this.logger?.info?.(upgradeStep('Checking requirement', [
                1,
                4
            ]));
            await this.checkRequirements(this.requirements, {
                npmVersionsMatches,
                project: this.project,
                target: this.target
            });
            this.logger?.info?.(upgradeStep('Applying the latest code modifications', [
                2,
                4
            ]));
            await this.runCodemods(codemodsRange);
            // We need to refresh the project files to make sure we have
            // the latest version of each file (including package.json) for the next steps
            this.logger?.debug?.('Refreshing project information...');
            this.project.refresh();
            this.logger?.info?.(upgradeStep('Upgrading Strapi dependencies', [
                3,
                4
            ]));
            await this.updateDependencies();
            this.logger?.info?.(upgradeStep('Installing dependencies', [
                4,
                4
            ]));
            await this.installDependencies();
        } catch (e) {
            return erroredReport(unknownToError(e));
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
        const errorMessage = `Requirement failed: ${originalError.message} (${highlight(requirement.name)})`;
        const warningMessage = originalError.message;
        const confirmationMessage = `Ignore optional requirement "${highlight(requirement.name)}" ?`;
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
        const json = createJSONTransformAPI(packageJSON);
        const dependencies = json.get('dependencies', {});
        const strapiDependencies = this.getScopedStrapiDependencies(dependencies);
        this.logger?.debug?.(`Found ${highlight(strapiDependencies.length)} dependency(ies) to update`);
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
        await saveJSON(packageJSONPath, updatedPackageJSON);
    }
    getScopedStrapiDependencies(dependencies) {
        const { strapiVersion } = this.project;
        const strapiDependencies = [];
        // Find all @strapi/* packages matching the current Strapi version
        for (const [name, version] of Object.entries(dependencies)){
            const isScopedStrapiPackage = name.startsWith(SCOPED_STRAPI_PACKAGE_PREFIX);
            const isOnCurrentStrapiVersion = isValidSemVer(version) && version === strapiVersion.raw;
            if (isScopedStrapiPackage && isOnCurrentStrapiVersion) {
                strapiDependencies.push([
                    name,
                    semVerFactory(version)
                ]);
            }
        }
        return strapiDependencies;
    }
    async installDependencies() {
        const projectPath = this.project.cwd;
        const packageManagerName = await packageManager.getPreferred(projectPath);
        this.logger?.debug?.(`Using ${highlight(packageManagerName)} as package manager`);
        if (this.isDry) {
            this.logger?.debug?.(`Skipping dependencies installation (${chalk.italic('dry mode')})`);
            return;
        }
        await packageManager.installDependencies(projectPath, packageManagerName, {
            stdout: this.logger?.stdout,
            stderr: this.logger?.stderr
        });
    }
    async runCodemods(range) {
        const codemodRunner = codemodRunnerFactory(this.project, range);
        codemodRunner.dry(this.isDry);
        if (this.logger) {
            codemodRunner.setLogger(this.logger);
        }
        await codemodRunner.run();
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
    if (isSemverInstance(target)) {
        const version = npmPackage.findVersion(target);
        if (!version) {
            throw new NPMCandidateNotFoundError(target);
        }
        return version;
    }
    // Release Types
    if (isSemVerReleaseType(target)) {
        const range = rangeFromVersions(project.strapiVersion, target);
        const npmVersionsMatches = npmPackage.findVersionsInRange(range);
        // The targeted version is the latest one that matches the given range
        const version = npmVersionsMatches.at(-1);
        if (!version) {
            throw new NPMCandidateNotFoundError(range, `The project is already up-to-date (${target})`);
        }
        return version;
    }
    throw new NPMCandidateNotFoundError(target);
};
const upgraderFactory = (project, target, npmPackage)=>{
    const npmTarget = resolveNPMTarget(project, target, npmPackage);
    const semverTarget = semVerFactory(npmTarget.version);
    if (semver.eq(semverTarget, project.strapiVersion)) {
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

export { Upgrader, upgraderFactory };
//# sourceMappingURL=upgrader.mjs.map
