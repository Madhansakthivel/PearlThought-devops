'use strict';

var commander = require('commander');
require('semver');
var range = require('../modules/version/range.js');

const projectPathOption = new commander.Option('-p, --project-path <project-path>', 'Root path to the Strapi application or plugin');
const dryOption = new commander.Option('-n, --dry', 'Simulate the upgrade without updating any files').default(false);
const debugOption = new commander.Option('-d, --debug', 'Get more logs in debug mode').default(false);
const silentOption = new commander.Option('-s, --silent', "Don't log anything").default(false);
const autoConfirmOption = new commander.Option('-y, --yes', 'Automatically answer "yes" to any prompts that the CLI might print on the command line.').default(false);
const rangeOption = new commander.Option('-r, --range <range>', 'Use a custom semver range for the codemods execution.').argParser((range$1)=>{
    if (!range.isValidStringifiedRange(range$1)) {
        throw new commander.InvalidArgumentError('Expected a valid semver range');
    }
    return range.rangeFactory(range$1);
});

exports.autoConfirmOption = autoConfirmOption;
exports.debugOption = debugOption;
exports.dryOption = dryOption;
exports.projectPathOption = projectPathOption;
exports.rangeOption = rangeOption;
exports.silentOption = silentOption;
//# sourceMappingURL=options.js.map
