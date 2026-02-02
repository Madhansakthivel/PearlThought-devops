'use strict';

var repository = require('../../modules/codemod-repository/repository.js');
require('../../modules/codemod-repository/constants.js');
var project = require('../../modules/project/project.js');
require('../../modules/project/constants.js');
var utils = require('./utils.js');
var formats = require('../../modules/format/formats.js');

const listCodemods = async (options)=>{
    const { logger, target } = options;
    const cwd = utils.resolvePath(options.cwd);
    const project$1 = project.projectFactory(cwd);
    const range = utils.findRangeFromTarget(project$1, target);
    logger.debug(formats.projectDetails(project$1));
    logger.debug(`Range: set to ${formats.versionRange(range)}`);
    // Create a codemod repository targeting the default location of the codemods
    const repo = repository.codemodRepositoryFactory();
    // Make sure all the codemods are loaded
    repo.refresh();
    // Find groups of codemods matching the given range
    const groups = repo.find({
        range
    });
    // Flatten the groups into a simple codemod array
    const codemods = groups.flatMap((collection)=>collection.codemods);
    // Debug
    logger.debug(`Found ${formats.highlight(codemods.length)} codemods`);
    // Don't log an empty table
    if (codemods.length === 0) {
        logger.info(`Found no codemods matching ${formats.versionRange(range)}`);
        return;
    }
    // Format the list to a pretty table
    const fCodemods = formats.codemodList(codemods);
    logger.raw(fCodemods);
};

exports.listCodemods = listCodemods;
//# sourceMappingURL=list-codemods.js.map
