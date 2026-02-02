import os from 'os';
import chalk from 'chalk';
import { program } from 'commander';
import { register } from './src/cli/commands/upgrade.mjs';
import { register as register$1 } from './src/cli/commands/codemods.mjs';
import { version } from './package.json.mjs';

register(program);
register$1(program);
program.usage('<command> [options]').on('command:*', ([invalidCmd])=>{
    console.error(chalk.red(`[ERROR] Invalid command: ${invalidCmd}.${os.EOL} See --help for a list of available commands.`));
    process.exit(1);
}).helpOption('-h, --help', 'Print command line options').addHelpCommand('help [command]', 'Print options for a specific command').version(version).parse(process.argv);
//# sourceMappingURL=cli.mjs.map
