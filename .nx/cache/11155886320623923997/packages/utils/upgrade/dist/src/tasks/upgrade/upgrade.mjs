import path from 'node:path';
import { projectDetails, version, durationMs } from '../../modules/format/formats.mjs';
import { npmPackageFactory } from '../../modules/npm/package.mjs';
import { projectFactory } from '../../modules/project/project.mjs';
import '../../modules/project/constants.mjs';
import { isApplicationProject } from '../../modules/project/utils.mjs';
import { timerFactory } from '../../modules/timer/timer.mjs';
import { upgraderFactory } from '../../modules/upgrader/upgrader.mjs';
import { STRAPI_PACKAGE_NAME } from '../../modules/upgrader/constants.mjs';
import 'semver';
import { ReleaseType } from '../../modules/version/types.mjs';
import { REQUIRE_AVAILABLE_NEXT_MAJOR, REQUIRE_LATEST_FOR_CURRENT_MAJOR } from './requirements/major.mjs';
import { REQUIRE_GIT } from './requirements/common.mjs';
import { latest } from './prompts/latest.mjs';

const upgrade = async (options)=>{
    const timer = timerFactory();
    const { logger, codemodsTarget } = options;
    // Resolves the correct working directory based on the given input
    const cwd = path.resolve(options.cwd ?? process.cwd());
    const project = projectFactory(cwd);
    logger.debug(projectDetails(project));
    if (!isApplicationProject(project)) {
        throw new Error(`The "${options.target}" upgrade can only be run on a Strapi project; for plugins, please use "codemods".`);
    }
    logger.debug(`Application: VERSION=${version(project.packageJSON.version)}; STRAPI_VERSION=${version(project.strapiVersion)}`);
    const npmPackage = npmPackageFactory(STRAPI_PACKAGE_NAME, project.cwd, logger);
    // Load all available versions from the NPM registry
    await npmPackage.refresh();
    // Initialize the upgrade instance
    // Throws during initialization if the provided target is incompatible with the current version
    const upgrader = upgraderFactory(project, options.target, npmPackage).dry(options.dry ?? false).onConfirm(options.confirm ?? null).setLogger(logger);
    // Manually override the target version for codemods if it's explicitly provided
    if (codemodsTarget !== undefined) {
        upgrader.overrideCodemodsTarget(codemodsTarget);
    }
    // Prompt user for confirmation details before upgrading
    await runUpgradePrompts(upgrader, options);
    // Add specific requirements before upgrading
    addUpgradeRequirements(upgrader, options);
    // Actually run the upgrade process once configured,
    // The response contains information about the final status: success/error
    const upgradeReport = await upgrader.upgrade();
    if (!upgradeReport.success) {
        throw upgradeReport.error;
    }
    timer.stop();
    logger.info(`Completed in ${durationMs(timer.elapsedMs)}ms`);
};
const runUpgradePrompts = async (upgrader, options)=>{
    if (options.target === ReleaseType.Latest) {
        await latest(upgrader, options);
    }
};
const addUpgradeRequirements = (upgrader, options)=>{
    // Don't add the same requirements when manually targeting a major upgrade
    // using a semver as it's implied that the users know what they're doing
    if (options.target === ReleaseType.Major) {
        upgrader.addRequirement(REQUIRE_AVAILABLE_NEXT_MAJOR).addRequirement(REQUIRE_LATEST_FOR_CURRENT_MAJOR);
    }
    // Make sure the git repository is in an optimal state before running the upgrade
    // Mainly used to ease rollbacks in case the upgrade is corrupted
    upgrader.addRequirement(REQUIRE_GIT.asOptional());
};

export { upgrade };
//# sourceMappingURL=upgrade.mjs.map
