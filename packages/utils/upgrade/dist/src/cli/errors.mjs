import chalk from 'chalk';
import { AbortedError } from '../modules/error/utils.mjs';

const handleError = (err, isSilent)=>{
    // If the upgrade process has been aborted, exit silently
    if (err instanceof AbortedError) {
        process.exit(0);
    }
    if (!isSilent) {
        console.error(chalk.red(`[ERROR]\t[${new Date().toISOString()}]`), err instanceof Error ? err.message : err);
    }
    process.exit(1);
};

export { handleError };
//# sourceMappingURL=errors.mjs.map
