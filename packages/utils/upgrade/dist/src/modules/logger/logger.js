'use strict';

var chalk = require('chalk');

class Logger {
    get isNotSilent() {
        return !this.isSilent;
    }
    get errors() {
        return this.nbErrorsCalls;
    }
    get warnings() {
        return this.nbWarningsCalls;
    }
    get stdout() {
        return this.isSilent ? undefined : process.stdout;
    }
    get stderr() {
        return this.isSilent ? undefined : process.stderr;
    }
    setDebug(debug) {
        this.isDebug = debug;
        return this;
    }
    setSilent(silent) {
        this.isSilent = silent;
        return this;
    }
    debug(...args) {
        const isDebugEnabled = this.isNotSilent && this.isDebug;
        if (isDebugEnabled) {
            console.log(chalk.cyan(`[DEBUG]\t[${nowAsISO()}]`), ...args);
        }
        return this;
    }
    error(...args) {
        this.nbErrorsCalls += 1;
        if (this.isNotSilent) {
            console.error(chalk.red(`[ERROR]\t[${nowAsISO()}]`), ...args);
        }
        return this;
    }
    info(...args) {
        if (this.isNotSilent) {
            console.info(chalk.blue(`[INFO]\t[${new Date().toISOString()}]`), ...args);
        }
        return this;
    }
    raw(...args) {
        if (this.isNotSilent) {
            console.log(...args);
        }
        return this;
    }
    warn(...args) {
        this.nbWarningsCalls += 1;
        if (this.isNotSilent) {
            console.warn(chalk.yellow(`[WARN]\t[${new Date().toISOString()}]`), ...args);
        }
        return this;
    }
    constructor(options = {}){
        // Set verbosity options
        this.isDebug = options.debug ?? false;
        this.isSilent = options.silent ?? false;
        // Initialize counters
        this.nbErrorsCalls = 0;
        this.nbWarningsCalls = 0;
    }
}
const nowAsISO = ()=>new Date().toISOString();
const loggerFactory = (options = {})=>new Logger(options);

exports.Logger = Logger;
exports.loggerFactory = loggerFactory;
//# sourceMappingURL=logger.js.map
