'use strict';

var prompts = require('prompts');
var commander = require('commander');
var logger = require('../../modules/logger/logger.js');
var semver = require('../../modules/version/semver.js');
require('semver');
var types = require('../../modules/version/types.js');
var errors = require('../errors.js');
var upgrade$1 = require('../../tasks/upgrade/upgrade.js');
require('../../tasks/upgrade/requirements/common.js');
require('cli-table3');
require('chalk');
require('node:path');
require('node:assert');
require('fs-extra');
require('fast-glob');
require('jscodeshift/src/Runner');
require('lodash/fp');
require('esbuild-register/dist/node');
require('../../modules/project/constants.js');
require('../../modules/codemod/constants.js');
require('../../modules/codemod-repository/constants.js');
var options = require('../options.js');

const upgrade = async (options)=>{
    try {
        const { silent, debug, yes } = options;
        const logger$1 = logger.loggerFactory({
            silent,
            debug
        });
        logger$1.warn("Please make sure you've created a backup of your codebase and files before upgrading");
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
        await upgrade$1.upgrade({
            logger: logger$1,
            confirm,
            dry: options.dry,
            cwd: options.projectPath,
            target: options.target,
            codemodsTarget: options.codemodsTarget
        });
    } catch (err) {
        errors.handleError(err, options.silent);
    }
};
/**
 * Registers upgrade related codemods.
 */ const register = (program)=>{
    const addReleaseUpgradeCommand = (releaseType, description)=>{
        program.command(releaseType).description(description).addOption(options.projectPathOption).addOption(options.dryOption).addOption(options.debugOption).addOption(options.silentOption).addOption(options.autoConfirmOption).action(async (options)=>{
            return upgrade({
                ...options,
                target: releaseType
            });
        });
    };
    // upgrade latest
    addReleaseUpgradeCommand(types.ReleaseType.Latest, 'Upgrade to the latest available version of Strapi');
    // upgrade major
    addReleaseUpgradeCommand(types.ReleaseType.Major, 'Upgrade to the next available major version of Strapi');
    // upgrade minor
    addReleaseUpgradeCommand(types.ReleaseType.Minor, 'Upgrade to the latest minor and patch version of Strapi for the current major');
    // upgrade patch
    addReleaseUpgradeCommand(types.ReleaseType.Patch, 'Upgrade to latest patch version of Strapi for the current major and minor');
    // upgrade to <target>
    program.command('to <target>', {
        hidden: true
    }).description('Upgrade to the specified version of Strapi').addOption(options.projectPathOption).addOption(options.dryOption).addOption(options.debugOption).addOption(options.silentOption).addOption(options.autoConfirmOption).addOption(new commander.Option('-c, --codemods-target <codemodsTarget>', 'Use a custom target for the codemods execution. Useful when targeting pre-releases').argParser((codemodsTarget)=>{
        if (!semver.isLiteralSemVer(codemodsTarget)) {
            throw new commander.InvalidArgumentError(`Expected a version with the following format: "<number>.<number>.<number>"`);
        }
        return semver.semVerFactory(codemodsTarget);
    })).action(async (target, options)=>{
        if (!semver.isValidSemVer(target)) {
            console.error(`Invalid target supplied, expected a valid semver but got "${target}"`);
            process.exit(1);
        }
        return upgrade({
            ...options,
            target: semver.semVerFactory(target)
        });
    });
};

exports.register = register;
exports.upgrade = upgrade;
//# sourceMappingURL=upgrade.js.map
