'use strict';

var path = require('node:path');
var formats = require('../../modules/format/formats.js');
var _package = require('../../modules/npm/package.js');
var project = require('../../modules/project/project.js');
require('../../modules/project/constants.js');
var utils = require('../../modules/project/utils.js');
var timer = require('../../modules/timer/timer.js');
var upgrader = require('../../modules/upgrader/upgrader.js');
var constants = require('../../modules/upgrader/constants.js');
require('semver');
var types = require('../../modules/version/types.js');
var major = require('./requirements/major.js');
var common = require('./requirements/common.js');
var latest = require('./prompts/latest.js');

const upgrade = async (options)=>{
    const timer$1 = timer.timerFactory();
    const { logger, codemodsTarget } = options;
    // Resolves the correct working directory based on the given input
    const cwd = path.resolve(options.cwd ?? process.cwd());
    const project$1 = project.projectFactory(cwd);
    logger.debug(formats.projectDetails(project$1));
    if (!utils.isApplicationProject(project$1)) {
        throw new Error(`The "${options.target}" upgrade can only be run on a Strapi project; for plugins, please use "codemods".`);
    }
    logger.debug(`Application: VERSION=${formats.version(project$1.packageJSON.version)}; STRAPI_VERSION=${formats.version(project$1.strapiVersion)}`);
    const npmPackage = _package.npmPackageFactory(constants.STRAPI_PACKAGE_NAME, project$1.cwd, logger);
    // Load all available versions from the NPM registry
    await npmPackage.refresh();
    // Initialize the upgrade instance
    // Throws during initialization if the provided target is incompatible with the current version
    const upgrader$1 = upgrader.upgraderFactory(project$1, options.target, npmPackage).dry(options.dry ?? false).onConfirm(options.confirm ?? null).setLogger(logger);
    // Manually override the target version for codemods if it's explicitly provided
    if (codemodsTarget !== undefined) {
        upgrader$1.overrideCodemodsTarget(codemodsTarget);
    }
    // Prompt user for confirmation details before upgrading
    await runUpgradePrompts(upgrader$1, options);
    // Add specific requirements before upgrading
    addUpgradeRequirements(upgrader$1, options);
    // Actually run the upgrade process once configured,
    // The response contains information about the final status: success/error
    const upgradeReport = await upgrader$1.upgrade();
    if (!upgradeReport.success) {
        throw upgradeReport.error;
    }
    timer$1.stop();
    logger.info(`Completed in ${formats.durationMs(timer$1.elapsedMs)}ms`);
};
const runUpgradePrompts = async (upgrader, options)=>{
    if (options.target === types.ReleaseType.Latest) {
        await latest.latest(upgrader, options);
    }
};
const addUpgradeRequirements = (upgrader, options)=>{
    // Don't add the same requirements when manually targeting a major upgrade
    // using a semver as it's implied that the users know what they're doing
    if (options.target === types.ReleaseType.Major) {
        upgrader.addRequirement(major.REQUIRE_AVAILABLE_NEXT_MAJOR).addRequirement(major.REQUIRE_LATEST_FOR_CURRENT_MAJOR);
    }
    // Make sure the git repository is in an optimal state before running the upgrade
    // Mainly used to ease rollbacks in case the upgrade is corrupted
    upgrader.addRequirement(common.REQUIRE_GIT.asOptional());
};

exports.upgrade = upgrade;
//# sourceMappingURL=upgrade.js.map
