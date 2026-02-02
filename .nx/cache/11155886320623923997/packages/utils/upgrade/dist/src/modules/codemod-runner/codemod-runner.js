'use strict';

var fp = require('lodash/fp');
var repository = require('../codemod-repository/repository.js');
var constants = require('../codemod-repository/constants.js');
var utils = require('../error/utils.js');
var semver = require('../version/semver.js');
require('semver');
var formats = require('../format/formats.js');

class CodemodRunner {
    setRange(range) {
        this.range = range;
        return this;
    }
    setLogger(logger) {
        this.logger = logger;
        return this;
    }
    onSelectCodemods(callback) {
        this.selectCodemodsCallback = callback;
        return this;
    }
    dry(enabled = true) {
        this.isDry = enabled;
        return this;
    }
    createRepository(codemodsDirectory) {
        const repository$1 = repository.codemodRepositoryFactory(codemodsDirectory ?? constants.INTERNAL_CODEMODS_DIRECTORY);
        // Make sure we have access to the latest snapshots of codemods on the system
        repository$1.refresh();
        return repository$1;
    }
    async safeRunAndReport(codemods) {
        if (this.isDry) {
            this.logger?.warn?.('Running the codemods in dry mode. No files will be modified during the process.');
        }
        try {
            const reports = await this.project.runCodemods(codemods, {
                dry: this.isDry
            });
            this.logger?.raw?.(formats.reports(reports));
            if (!this.isDry) {
                const nbAffectedTotal = reports.flatMap((report)=>report.report.ok).reduce((acc, nb)=>acc + nb, 0);
                this.logger?.debug?.(`Successfully ran ${formats.highlight(codemods.length)} codemod(s), ${formats.highlight(nbAffectedTotal)} change(s) have been detected`);
            }
            return successReport();
        } catch (e) {
            return erroredReport(utils.unknownToError(e));
        }
    }
    async runByUID(uid, codemodsDirectory) {
        const repository = this.createRepository(codemodsDirectory);
        if (!repository.has(uid)) {
            throw new Error(`Unknown codemod UID provided: ${uid}`);
        }
        // Note: Ignore the range when running with a UID
        const codemods = repository.find({
            uids: [
                uid
            ]
        }).flatMap(({ codemods })=>codemods);
        return this.safeRunAndReport(codemods);
    }
    async run(codemodsDirectory) {
        const repository = this.createRepository(codemodsDirectory);
        // Find codemods matching the given range
        const codemodsInRange = repository.find({
            range: this.range
        });
        // If a selection callback is set, use it, else keep every codemods found
        const selectedCodemods = this.selectCodemodsCallback ? await this.selectCodemodsCallback(codemodsInRange) : codemodsInRange;
        // If no codemods have been selected (either manually or automatically)
        // Then ignore and return a successful report
        if (selectedCodemods.length === 0) {
            this.logger?.debug?.(`Found no codemods to run for ${formats.versionRange(this.range)}`);
            return successReport();
        }
        // Flatten the collection to a single list of codemods, the original list should already be sorted by version
        const codemods = selectedCodemods.flatMap(({ codemods })=>codemods);
        // Log (debug) the codemods by version
        const codemodsByVersion = fp.groupBy('version', codemods);
        const fRange = formats.versionRange(this.range);
        this.logger?.debug?.(`Found ${formats.highlight(codemods.length)} codemods for ${formats.highlight(fp.size(codemodsByVersion))} version(s) using ${fRange}`);
        for (const [version, codemods] of Object.entries(codemodsByVersion)){
            this.logger?.debug?.(`- ${formats.version(semver.semVerFactory(version))} (${codemods.length})`);
        }
        return this.safeRunAndReport(codemods);
    }
    constructor(project, range){
        this.project = project;
        this.range = range;
        this.isDry = false;
        this.logger = null;
        this.selectCodemodsCallback = null;
    }
}
const codemodRunnerFactory = (project, range)=>{
    return new CodemodRunner(project, range);
};
const successReport = ()=>({
        success: true,
        error: null
    });
const erroredReport = (error)=>({
        success: false,
        error
    });

exports.CodemodRunner = CodemodRunner;
exports.codemodRunnerFactory = codemodRunnerFactory;
//# sourceMappingURL=codemod-runner.js.map
