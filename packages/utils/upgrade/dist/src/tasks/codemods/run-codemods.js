'use strict';

var formats = require('../../modules/format/formats.js');
var timer = require('../../modules/timer/timer.js');
var project = require('../../modules/project/project.js');
require('../../modules/project/constants.js');
var codemodRunner = require('../../modules/codemod-runner/codemod-runner.js');
var utils = require('./utils.js');

const runCodemods = async (options)=>{
    const timer$1 = timer.timerFactory();
    const { logger, uid } = options;
    // Make sure we're resolving the correct working directory based on the given input
    const cwd = utils.resolvePath(options.cwd);
    const project$1 = project.projectFactory(cwd);
    const range = utils.findRangeFromTarget(project$1, options.target);
    logger.debug(formats.projectDetails(project$1));
    logger.debug(`Range: set to ${formats.versionRange(range)}`);
    const codemodRunner$1 = codemodRunner.codemodRunnerFactory(project$1, range).dry(options.dry ?? false).onSelectCodemods(options.selectCodemods ?? null).setLogger(logger);
    let report;
    // If uid is defined, only run the selected codemod
    if (uid !== undefined) {
        logger.debug(`Running a single codemod: ${formats.codemodUID(uid)}`);
        report = await codemodRunner$1.runByUID(uid);
    } else {
        report = await codemodRunner$1.run();
    }
    if (!report.success) {
        throw report.error;
    }
    timer$1.stop();
    logger.info(`Completed in ${timer$1.elapsedMs}`);
};

exports.runCodemods = runCodemods;
//# sourceMappingURL=run-codemods.js.map
