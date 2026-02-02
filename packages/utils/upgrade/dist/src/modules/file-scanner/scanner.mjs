import path from 'node:path';
import fastglob from 'fast-glob';

class FileScanner {
    scan(patterns) {
        // we use fastglob instead of glob because it supports negation patterns
        const filenames = fastglob.sync(patterns, {
            cwd: this.cwd
        });
        // Resolve the full paths for every filename
        return filenames.map((filename)=>path.join(this.cwd, filename));
    }
    constructor(cwd){
        this.cwd = cwd;
    }
}
const fileScannerFactory = (cwd)=>new FileScanner(cwd);

export { FileScanner, fileScannerFactory };
//# sourceMappingURL=scanner.mjs.map
