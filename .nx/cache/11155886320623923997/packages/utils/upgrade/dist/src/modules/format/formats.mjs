import CliTable3 from 'cli-table3';
import chalk from 'chalk';
import { ONE_SECOND_MS } from '../timer/constants.mjs';

const path = (path)=>chalk.blue(path);
const version = (version)=>{
    return chalk.italic.yellow(`v${version}`);
};
const codemodUID = (uid)=>{
    return chalk.bold.cyan(uid);
};
const projectDetails = (project)=>{
    return `Project: TYPE=${projectType(project.type)}; CWD=${path(project.cwd)}; PATHS=${project.paths.map(path)}`;
};
const projectType = (type)=>chalk.cyan(type);
const versionRange = (range)=>chalk.italic.yellow(range.raw);
const transform = (transformFilePath)=>chalk.cyan(transformFilePath);
const highlight = (arg)=>chalk.bold.underline(arg);
const upgradeStep = (text, step)=>{
    return chalk.bold(`(${step[0]}/${step[1]}) ${text}...`);
};
const reports = (reports)=>{
    const rows = reports.map(({ codemod, report }, i)=>{
        const fIndex = chalk.grey(i);
        const fVersion = chalk.magenta(codemod.version);
        const fKind = chalk.yellow(codemod.kind);
        const fFormattedTransformPath = chalk.cyan(codemod.format());
        const fTimeElapsed = i === 0 ? `${report.timeElapsed}s ${chalk.dim.italic('(cold start)')}` : `${report.timeElapsed}s`;
        const fAffected = report.ok > 0 ? chalk.green(report.ok) : chalk.grey(0);
        const fUnchanged = report.ok === 0 ? chalk.red(report.nochange) : chalk.grey(report.nochange);
        return [
            fIndex,
            fVersion,
            fKind,
            fFormattedTransformPath,
            fAffected,
            fUnchanged,
            fTimeElapsed
        ];
    });
    const table = new CliTable3({
        style: {
            compact: true
        },
        head: [
            chalk.bold.grey('N°'),
            chalk.bold.magenta('Version'),
            chalk.bold.yellow('Kind'),
            chalk.bold.cyan('Name'),
            chalk.bold.green('Affected'),
            chalk.bold.red('Unchanged'),
            chalk.bold.blue('Duration')
        ]
    });
    table.push(...rows);
    return table.toString();
};
const codemodList = (codemods)=>{
    const rows = codemods.map((codemod, index)=>{
        const fIndex = chalk.grey(index);
        const fVersion = chalk.magenta(codemod.version);
        const fKind = chalk.yellow(codemod.kind);
        const fName = chalk.blue(codemod.format());
        const fUID = codemodUID(codemod.uid);
        return [
            fIndex,
            fVersion,
            fKind,
            fName,
            fUID
        ];
    });
    const table = new CliTable3({
        style: {
            compact: true
        },
        head: [
            chalk.bold.grey('N°'),
            chalk.bold.magenta('Version'),
            chalk.bold.yellow('Kind'),
            chalk.bold.blue('Name'),
            chalk.bold.cyan('UID')
        ]
    });
    table.push(...rows);
    return table.toString();
};
const durationMs = (elapsedMs)=>{
    const elapsedSeconds = (elapsedMs / ONE_SECOND_MS).toFixed(3);
    return `${elapsedSeconds}s`;
};

export { codemodList, codemodUID, durationMs, highlight, path, projectDetails, projectType, reports, transform, upgradeStep, version, versionRange };
//# sourceMappingURL=formats.mjs.map
