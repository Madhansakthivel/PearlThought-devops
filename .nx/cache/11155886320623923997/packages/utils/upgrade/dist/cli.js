'use strict';

var os = require('os');
var chalk = require('chalk');
var commander = require('commander');
var upgrade = require('./src/cli/commands/upgrade.js');
var codemods = require('./src/cli/commands/codemods.js');
var _package = require('./package.json.js');

upgrade.register(commander.program);
codemods.register(commander.program);
commander.program.usage('<command> [options]').on('command:*', ([invalidCmd])=>{
    console.error(chalk.red(`[ERROR] Invalid command: ${invalidCmd}.${os.EOL} See --help for a list of available commands.`));
    process.exit(1);
}).helpOption('-h, --help', 'Print command line options').addHelpCommand('help [command]', 'Print options for a specific command').version(_package.version).parse(process.argv);
//# sourceMappingURL=cli.js.map
