import prompts from 'prompts';
import { Option, InvalidArgumentError } from 'commander';
import { loggerFactory } from '../../modules/logger/logger.mjs';
import { isLiteralSemVer, semVerFactory, isValidSemVer } from '../../modules/version/semver.mjs';
import 'semver';
import { ReleaseType } from '../../modules/version/types.mjs';
import { handleError } from '../errors.mjs';
import { upgrade as upgrade$1 } from '../../tasks/upgrade/upgrade.mjs';
import '../../tasks/upgrade/requirements/common.mjs';
import 'cli-table3';
import 'chalk';
import 'node:path';
import 'node:assert';
import 'fs-extra';
import 'fast-glob';
import 'jscodeshift/src/Runner';
import 'lodash/fp';
import 'esbuild-register/dist/node';
import '../../modules/project/constants.mjs';
import '../../modules/codemod/constants.mjs';
import '../../modules/codemod-repository/constants.mjs';
import { projectPathOption, dryOption, debugOption, silentOption, autoConfirmOption } from '../options.mjs';

const upgrade = async (options)=>{
    try {
        const { silent, debug, yes } = options;
        const logger = loggerFactory({
            silent,
            debug
        });
        logger.warn("Please make sure you've created a backup of your codebase and files before upgrading");
        const confirm = async (message)=>{
            if (yes) {
                return true;
            }
            const { confirm } = await prompts({
                name: 'confirm',
                type: 'confirm',
                message
            });
            // If confirm is undefined (Ctrl + C), default to false
            return confirm ?? false;
        };
        await upgrade$1({
            logger,
            confirm,
            dry: options.dry,
            cwd: options.projectPath,
            target: options.target,
            codemodsTarget: options.codemodsTarget
        });
    } catch (err) {
        handleError(err, options.silent);
    }
};
/**
 * Registers upgrade related codemods.
 */ const register = (program)=>{
    const addReleaseUpgradeCommand = (releaseType, description)=>{
        program.command(releaseType).description(description).addOption(projectPathOption).addOption(dryOption).addOption(debugOption).addOption(silentOption).addOption(autoConfirmOption).action(async (options)=>{
            return upgrade({
                ...options,
                target: releaseType
            });
        });
    };
    // upgrade latest
    addReleaseUpgradeCommand(ReleaseType.Latest, 'Upgrade to the latest available version of Strapi');
    // upgrade major
    addReleaseUpgradeCommand(ReleaseType.Major, 'Upgrade to the next available major version of Strapi');
    // upgrade minor
    addReleaseUpgradeCommand(ReleaseType.Minor, 'Upgrade to the latest minor and patch version of Strapi for the current major');
    // upgrade patch
    addReleaseUpgradeCommand(ReleaseType.Patch, 'Upgrade to latest patch version of Strapi for the current major and minor');
    // upgrade to <target>
    program.command('to <target>', {
        hidden: true
    }).description('Upgrade to the specified version of Strapi').addOption(projectPathOption).addOption(dryOption).addOption(debugOption).addOption(silentOption).addOption(autoConfirmOption).addOption(new Option('-c, --codemods-target <codemodsTarget>', 'Use a custom target for the codemods execution. Useful when targeting pre-releases').argParser((codemodsTarget)=>{
        if (!isLiteralSemVer(codemodsTarget)) {
            throw new InvalidArgumentError(`Expected a version with the following format: "<number>.<number>.<number>"`);
        }
        return semVerFactory(codemodsTarget);
    })).action(async (target, options)=>{
        if (!isValidSemVer(target)) {
            console.error(`Invalid target supplied, expected a valid semver but got "${target}"`);
            process.exit(1);
        }
        return upgrade({
            ...options,
            target: semVerFactory(target)
        });
    });
};

export { register, upgrade };
//# sourceMappingURL=upgrade.mjs.map
