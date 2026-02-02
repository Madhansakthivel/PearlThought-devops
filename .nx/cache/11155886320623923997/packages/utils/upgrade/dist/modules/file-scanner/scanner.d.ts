import type { FileScanner as FileScannerInterface } from './types';
export declare class FileScanner implements FileScannerInterface {
    cwd: string;
    constructor(cwd: string);
    scan(patterns: string[]): string[];
}
export declare const fileScannerFactory: (cwd: string) => FileScanner;
//# sourceMappingURL=scanner.d.ts.map