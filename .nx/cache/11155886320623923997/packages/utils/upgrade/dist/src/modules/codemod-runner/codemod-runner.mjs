import { groupBy, size } from 'lodash/fp';
import { codemodRepositoryFactory } from '../codemod-repository/repository.mjs';
import { INTERNAL_CODEMODS_DIRECTORY } from '../codemod-repository/constants.mjs';
import { unknownToError } from '../error/utils.mjs';
import { semVerFactory } from '../version/semver.mjs';
import 'semver';
import { reports, highlight, versionRange, version } from '../format/formats.mjs';

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
        const repository = codemodRepositoryFactory(codemodsDirectory ?? INTERNAL_CODEMODS_DIRECTORY);
        // Make sure we have access to the latest snapshots of codemods on the system
        repository.refresh();
        return repository;
    }
    async safeRunAndReport(codemods) {
        if (this.isDry) {
            this.logger?.warn?.('Running the codemods in dry mode. No files will be modified during the process.');
        }
        try {
            const reports$1 = await this.project.runCodemods(codemods, {
                dry: this.isDry
            });
            this.logger?.raw?.(reports(reports$1));
            if (!this.isDry) {
                const nbAffectedTotal = reports$1.flatMap((report)=>report.report.ok).reduce((acc, nb)=>acc + nb, 0);
                this.logger?.debug?.(`Successfully ran ${highlight(codemods.length)} codemod(s), ${highlight(nbAffectedTotal)} change(s) have been detected`);
            }
            return successReport();
        } catch (e) {
            return erroredReport(unknownToError(e));
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
            this.logger?.debug?.(`Found no codemods to run for ${versionRange(this.range)}`);
            return successReport();
        }
        // Flatten the collection to a single list of codemods, the original list should already be sorted by version
        const codemods = selectedCodemods.flatMap(({ codemods })=>codemods);
        // Log (debug) the codemods by version
        const codemodsByVersion = groupBy('version', codemods);
        const fRange = versionRange(this.range);
        this.logger?.debug?.(`Found ${highlight(codemods.length)} codemods for ${highlight(size(codemodsByVersion))} version(s) using ${fRange}`);
        for (const [version$1, codemods] of Object.entries(codemodsByVersion)){
            this.logger?.debug?.(`- ${version(semVerFactory(version$1))} (${codemods.length})`);
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

export { CodemodRunner, codemodRunnerFactory };
//# sourceMappingURL=codemod-runner.mjs.map
