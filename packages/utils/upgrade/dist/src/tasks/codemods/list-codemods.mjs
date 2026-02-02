import { codemodRepositoryFactory } from '../../modules/codemod-repository/repository.mjs';
import '../../modules/codemod-repository/constants.mjs';
import { projectFactory } from '../../modules/project/project.mjs';
import '../../modules/project/constants.mjs';
import { resolvePath, findRangeFromTarget } from './utils.mjs';
import { projectDetails, versionRange, highlight, codemodList } from '../../modules/format/formats.mjs';

const listCodemods = async (options)=>{
    const { logger, target } = options;
    const cwd = resolvePath(options.cwd);
    const project = projectFactory(cwd);
    const range = findRangeFromTarget(project, target);
    logger.debug(projectDetails(project));
    logger.debug(`Range: set to ${versionRange(range)}`);
    // Create a codemod repository targeting the default location of the codemods
    const repo = codemodRepositoryFactory();
    // Make sure all the codemods are loaded
    repo.refresh();
    // Find groups of codemods matching the given range
    const groups = repo.find({
        range
    });
    // Flatten the groups into a simple codemod array
    const codemods = groups.flatMap((collection)=>collection.codemods);
    // Debug
    logger.debug(`Found ${highlight(codemods.length)} codemods`);
    // Don't log an empty table
    if (codemods.length === 0) {
        logger.info(`Found no codemods matching ${versionRange(range)}`);
        return;
    }
    // Format the list to a pretty table
    const fCodemods = codemodList(codemods);
    logger.raw(fCodemods);
};

export { listCodemods };
//# sourceMappingURL=list-codemods.mjs.map
