'use strict';

var prompts = require('prompts');
var logger = require('../../modules/logger/logger.js');
require('semver');
var types = require('../../modules/version/types.js');
var errors = require('../errors.js');
require('node:path');
require('cli-table3');
require('chalk');
require('../../modules/npm/package.js');
require('node:assert');
require('fs-extra');
require('fast-glob');
require('jscodeshift/src/Runner');
require('lodash/fp');
require('esbuild-register/dist/node');
require('../../modules/project/constants.js');
require('@strapi/utils');
require('../../modules/codemod/constants.js');
require('../../modules/codemod-repository/constants.js');
require('../../tasks/upgrade/requirements/common.js');
var runCodemods$1 = require('../../tasks/codemods/run-codemods.js');
var listCodemods$1 = require('../../tasks/codemods/list-codemods.js');
var options = require('../options.js');

const DEFAULT_TARGET = types.ReleaseType.Major;
const runCodemods = async (options)=>{
    const { silent, debug } = options;
    const logger$1 = logger.loggerFactory({
        silent,
        debug
    });
    logger$1.warn("Please make sure you've created a backup of your codebase and files before running the codemods");
    const confirm = async (message)=>{
        const { confirm } = await prompts({
            name: 'confirm',
            type: 'confirm',
            message
        });
        // If confirm is undefined (Ctrl + C), default to false
        return confirm ?? false;
    };
    const selectCodemods = async (codemods)=>{
        const selectableCodemods = codemods.map(({ version, codemods })=>codemods.map((codemod)=>({
                    title: `(${version}) ${codemod.format()}`,
                    value: codemod,
                    selected: true
                }))).flat();
        if (selectableCodemods.length === 0) {
            logger$1.info('No codemods to run');
            return [];
        }
        const { selectedCodemods } = await prompts({
            type: 'autocompleteMultiselect',
            name: 'selectedCodemods',
            message: 'Choose the codemods you would like to run:',
            choices: selectableCodemods
        });
        if (!selectedCodemods || selectedCodemods.length === 0) {
            logger$1.info('No codemods selected');
            return [];
        }
        return selectedCodemods.map((codemod)=>({
                version: codemod.version,
                codemods: [
                    codemod
                ]
            }));
    };
    return runCodemods$1.runCodemods({
        logger: logger$1,
        confirm,
        selectCodemods,
        dry: options.dry,
        cwd: options.projectPath,
        target: options.range ?? DEFAULT_TARGET,
        uid: options.uid
    }).catch((err)=>errors.handleError(err, options.silent));
};
const listCodemods = async (options)=>{
    const { silent, debug } = options;
    const logger$1 = logger.loggerFactory({
        silent,
        debug
    });
    return listCodemods$1.listCodemods({
        cwd: options.projectPath,
        target: options.range ?? DEFAULT_TARGET,
        logger: logger$1
    }).catch((err)=>errors.handleError(err, options.silent));
};
/**
 * Registers codemods related commands.
 */ const register = (program)=>{
    const codemodsCommand = program.command('codemods');
    // upgrade codemods run [options] [uid]
    codemodsCommand.command('run [uid]').description(`
Executes a set of codemods on the current project.

If the optional UID argument is provided, the command specifically runs the codemod associated with that UID.
Without the UID, the command produces a list of all available codemods for your project.

By default, when executed on a Strapi application project, it offers codemods matching the current major version of the app.
When executed on a Strapi plugin project, it shows every codemods.
`).addOption(options.projectPathOption).addOption(options.dryOption).addOption(options.debugOption).addOption(options.silentOption).addOption(options.rangeOption).action(async (uid, options)=>{
        return runCodemods({
            ...options,
            uid
        });
    });
    // upgrade codemods ls [options]
    codemodsCommand.command('ls').description(`List available codemods`).addOption(options.projectPathOption).addOption(options.debugOption).addOption(options.silentOption).addOption(options.rangeOption).action(async (options)=>{
        return listCodemods(options);
    });
};

exports.listCodemods = listCodemods;
exports.register = register;
exports.runCodemods = runCodemods;
//# sourceMappingURL=codemods.js.map
