'use strict';

var chalk = require('chalk');
var utils = require('../modules/error/utils.js');

const handleError = (err, isSilent)=>{
    // If the upgrade process has been aborted, exit silently
    if (err instanceof utils.AbortedError) {
        process.exit(0);
    }
    if (!isSilent) {
        console.error(chalk.red(`[ERROR]\t[${new Date().toISOString()}]`), err instanceof Error ? err.message : err);
    }
    process.exit(1);
};

exports.handleError = handleError;
//# sourceMappingURL=errors.js.map
