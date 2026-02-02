import prompts from 'prompts';
import { loggerFactory } from '../../modules/logger/logger.mjs';
import 'semver';
import { ReleaseType } from '../../modules/version/types.mjs';
import { handleError } from '../errors.mjs';
import 'node:path';
import 'cli-table3';
import 'chalk';
import '../../modules/npm/package.mjs';
import 'node:assert';
import 'fs-extra';
import 'fast-glob';
import 'jscodeshift/src/Runner';
import 'lodash/fp';
import 'esbuild-register/dist/node';
import '../../modules/project/constants.mjs';
import '@strapi/utils';
import '../../modules/codemod/constants.mjs';
import '../../modules/codemod-repository/constants.mjs';
import '../../tasks/upgrade/requirements/common.mjs';
import { runCodemods as runCodemods$1 } from '../../tasks/codemods/run-codemods.mjs';
import { listCodemods as listCodemods$1 } from '../../tasks/codemods/list-codemods.mjs';
import { projectPathOption, dryOption, debugOption, silentOption, rangeOption } from '../options.mjs';

const DEFAULT_TARGET = ReleaseType.Major;
const runCodemods = async (options)=>{
    const { silent, debug } = options;
    const logger = loggerFactory({
        silent,
        debug
    });
    logger.warn("Please make sure you've created a backup of your codebase and files before running the codemods");
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
            logger.info('No codemods to run');
            return [];
        }
        const { selectedCodemods } = await prompts({
            type: 'autocompleteMultiselect',
            name: 'selectedCodemods',
            message: 'Choose the codemods you would like to run:',
            choices: selectableCodemods
        });
        if (!selectedCodemods || selectedCodemods.length === 0) {
            logger.info('No codemods selected');
            return [];
        }
        return selectedCodemods.map((codemod)=>({
                version: codemod.version,
                codemods: [
                    codemod
                ]
            }));
    };
    return runCodemods$1({
        logger,
        confirm,
        selectCodemods,
        dry: options.dry,
        cwd: options.projectPath,
        target: options.range ?? DEFAULT_TARGET,
        uid: options.uid
    }).catch((err)=>handleError(err, options.silent));
};
const listCodemods = async (options)=>{
    const { silent, debug } = options;
    const logger = loggerFactory({
        silent,
        debug
    });
    return listCodemods$1({
        cwd: options.projectPath,
        target: options.range ?? DEFAULT_TARGET,
        logger
    }).catch((err)=>handleError(err, options.silent));
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
`).addOption(projectPathOption).addOption(dryOption).addOption(debugOption).addOption(silentOption).addOption(rangeOption).action(async (uid, options)=>{
        return runCodemods({
            ...options,
            uid
        });
    });
    // upgrade codemods ls [options]
    codemodsCommand.command('ls').description(`List available codemods`).addOption(projectPathOption).addOption(debugOption).addOption(silentOption).addOption(rangeOption).action(async (options)=>{
        return listCodemods(options);
    });
};

export { listCodemods, register, runCodemods };
//# sourceMappingURL=codemods.mjs.map
