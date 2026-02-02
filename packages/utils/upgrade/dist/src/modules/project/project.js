'use strict';

var path = require('node:path');
var assert = require('node:assert');
var fse = require('fs-extra');
var semver$1 = require('semver');
var semver = require('../version/semver.js');
var scanner = require('../file-scanner/scanner.js');
var code = require('../runner/code/code.js');
var json = require('../runner/json/json.js');
var constants = require('./constants.js');

class Project {
    getFilesByExtensions(extensions) {
        return this.files.filter((filePath)=>{
            const fileExtension = path.extname(filePath);
            return extensions.includes(fileExtension);
        });
    }
    refresh() {
        this.refreshPackageJSON();
        this.refreshProjectFiles();
        return this;
    }
    async runCodemods(codemods, options) {
        const runners = this.createProjectCodemodsRunners(options.dry);
        const reports = [];
        for (const codemod of codemods){
            for (const runner of runners){
                if (runner.valid(codemod)) {
                    const report = await runner.run(codemod);
                    reports.push({
                        codemod,
                        report
                    });
                }
            }
        }
        return reports;
    }
    createProjectCodemodsRunners(dry = false) {
        const jsonExtensions = constants.PROJECT_JSON_EXTENSIONS.map((ext)=>`.${ext}`);
        const codeExtensions = constants.PROJECT_CODE_EXTENSIONS.map((ext)=>`.${ext}`);
        const jsonFiles = this.getFilesByExtensions(jsonExtensions);
        const codeFiles = this.getFilesByExtensions(codeExtensions);
        const codeRunner = code.codeRunnerFactory(codeFiles, {
            dry,
            parser: 'ts',
            runInBand: true,
            babel: true,
            extensions: constants.PROJECT_CODE_EXTENSIONS.join(','),
            // Don't output any log coming from the runner
            print: false,
            silent: true,
            verbose: 0
        });
        const jsonRunner = json.jsonRunnerFactory(jsonFiles, {
            dry,
            cwd: this.cwd
        });
        return [
            codeRunner,
            jsonRunner
        ];
    }
    refreshPackageJSON() {
        const packageJSONPath = path.join(this.cwd, constants.PROJECT_PACKAGE_JSON);
        try {
            fse.accessSync(packageJSONPath);
        } catch  {
            throw new Error(`Could not find a ${constants.PROJECT_PACKAGE_JSON} file in ${this.cwd}`);
        }
        const packageJSONBuffer = fse.readFileSync(packageJSONPath);
        this.packageJSONPath = packageJSONPath;
        this.packageJSON = JSON.parse(packageJSONBuffer.toString());
    }
    refreshProjectFiles() {
        const scanner$1 = scanner.fileScannerFactory(this.cwd);
        this.files = scanner$1.scan(this.paths);
    }
    constructor(cwd, config){
        if (!fse.pathExistsSync(cwd)) {
            throw new Error(`ENOENT: no such file or directory, access '${cwd}'`);
        }
        this.cwd = cwd;
        this.paths = config.paths;
        this.refresh();
    }
}
class AppProject extends Project {
    /**
   * Returns an array of allowed file paths for a Strapi application
   *
   * The resulting paths include app default files and the root package.json file.
   */ static get paths() {
        const allowedRootPaths = formatGlobCollectionPattern(constants.PROJECT_APP_ALLOWED_ROOT_PATHS);
        const allowedExtensions = formatGlobCollectionPattern(constants.PROJECT_ALLOWED_EXTENSIONS);
        return [
            // App default files
            `./${allowedRootPaths}/**/*.${allowedExtensions}`,
            `!./**/node_modules/**/*`,
            `!./**/dist/**/*`,
            // Root package.json file
            constants.PROJECT_PACKAGE_JSON
        ];
    }
    refresh() {
        super.refresh();
        this.refreshStrapiVersion();
        return this;
    }
    refreshStrapiVersion() {
        this.strapiVersion = // First try to get the strapi version from the package.json dependencies
        this.findStrapiVersionFromProjectPackageJSON() ?? // If the version found is not a valid SemVer, get the Strapi version from the installed package
        this.findLocallyInstalledStrapiVersion();
    }
    findStrapiVersionFromProjectPackageJSON() {
        const projectName = this.packageJSON.name;
        const version = this.packageJSON.dependencies?.[constants.STRAPI_DEPENDENCY_NAME];
        if (version === undefined) {
            throw new Error(`No version of ${constants.STRAPI_DEPENDENCY_NAME} was found in ${projectName}. Are you in a valid Strapi project?`);
        }
        const isValidSemVer = semver.isLiteralSemVer(version) && semver$1.valid(version) === version;
        // We return undefined only if a strapi/strapi version is found, but it's not semver compliant
        return isValidSemVer ? semver.semVerFactory(version) : undefined;
    }
    findLocallyInstalledStrapiVersion() {
        const packageSearchText = `${constants.STRAPI_DEPENDENCY_NAME}/package.json`;
        let strapiPackageJSONPath;
        let strapiPackageJSON;
        try {
            strapiPackageJSONPath = require.resolve(packageSearchText, {
                paths: [
                    this.cwd
                ]
            });
            strapiPackageJSON = require(strapiPackageJSONPath);
            assert(typeof strapiPackageJSON === 'object');
        } catch  {
            throw new Error(`Cannot resolve module "${constants.STRAPI_DEPENDENCY_NAME}" from paths [${this.cwd}]`);
        }
        const strapiVersion = strapiPackageJSON.version;
        if (!semver.isValidSemVer(strapiVersion)) {
            throw new Error(`Invalid ${constants.STRAPI_DEPENDENCY_NAME} version found in ${strapiPackageJSONPath} (${strapiVersion})`);
        }
        return semver.semVerFactory(strapiVersion);
    }
    constructor(cwd){
        super(cwd, {
            paths: AppProject.paths
        }), this.type = 'application';
        this.refreshStrapiVersion();
    }
}
const formatGlobCollectionPattern = (collection)=>{
    assert(collection.length > 0, 'Invalid pattern provided, the given collection needs at least 1 element');
    return collection.length === 1 ? collection[0] : `{${collection}}`;
};
class PluginProject extends Project {
    /**
   * Returns an array of allowed file paths for a Strapi plugin
   *
   * The resulting paths include plugin default files, the root package.json file, and plugin-specific files.
   */ static get paths() {
        const allowedRootPaths = formatGlobCollectionPattern(constants.PROJECT_PLUGIN_ALLOWED_ROOT_PATHS);
        const allowedExtensions = formatGlobCollectionPattern(constants.PROJECT_ALLOWED_EXTENSIONS);
        return [
            // Plugin default files
            `./${allowedRootPaths}/**/*.${allowedExtensions}`,
            `!./**/node_modules/**/*`,
            `!./**/dist/**/*`,
            // Root package.json file
            constants.PROJECT_PACKAGE_JSON,
            // Plugin root files
            ...constants.PROJECT_PLUGIN_ROOT_FILES
        ];
    }
    constructor(cwd){
        super(cwd, {
            paths: PluginProject.paths
        }), this.type = 'plugin';
    }
}
const isPlugin = (cwd)=>{
    const packageJSONPath = path.join(cwd, constants.PROJECT_PACKAGE_JSON);
    try {
        fse.accessSync(packageJSONPath);
    } catch  {
        throw new Error(`Could not find a ${constants.PROJECT_PACKAGE_JSON} file in ${cwd}`);
    }
    const packageJSONBuffer = fse.readFileSync(packageJSONPath);
    const packageJSON = JSON.parse(packageJSONBuffer.toString());
    return packageJSON?.strapi?.kind === 'plugin';
};
// TODO: make this async so we can use async file methods
const projectFactory = (cwd)=>{
    fse.accessSync(cwd);
    return isPlugin(cwd) ? new PluginProject(cwd) : new AppProject(cwd);
};

exports.AppProject = AppProject;
exports.PluginProject = PluginProject;
exports.Project = Project;
exports.projectFactory = projectFactory;
//# sourceMappingURL=project.js.map
