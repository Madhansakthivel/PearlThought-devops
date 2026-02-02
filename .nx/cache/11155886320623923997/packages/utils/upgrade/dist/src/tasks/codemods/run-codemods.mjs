import { projectDetails, versionRange, codemodUID } from '../../modules/format/formats.mjs';
import { timerFactory } from '../../modules/timer/timer.mjs';
import { projectFactory } from '../../modules/project/project.mjs';
import '../../modules/project/constants.mjs';
import { codemodRunnerFactory } from '../../modules/codemod-runner/codemod-runner.mjs';
import { resolvePath, findRangeFromTarget } from './utils.mjs';

const runCodemods = async (options)=>{
    const timer = timerFactory();
    const { logger, uid } = options;
    // Make sure we're resolving the correct working directory based on the given input
    const cwd = resolvePath(options.cwd);
    const project = projectFactory(cwd);
    const range = findRangeFromTarget(project, options.target);
    logger.debug(projectDetails(project));
    logger.debug(`Range: set to ${versionRange(range)}`);
    const codemodRunner = codemodRunnerFactory(project, range).dry(options.dry ?? false).onSelectCodemods(options.selectCodemods ?? null).setLogger(logger);
    let report;
    // If uid is defined, only run the selected codemod
    if (uid !== undefined) {
        logger.debug(`Running a single codemod: ${codemodUID(uid)}`);
        report = await codemodRunner.runByUID(uid);
    } else {
        report = await codemodRunner.run();
    }
    if (!report.success) {
        throw report.error;
    }
    timer.stop();
    logger.info(`Completed in ${timer.elapsedMs}`);
};

export { runCodemods };
//# sourceMappingURL=run-codemods.mjs.map
