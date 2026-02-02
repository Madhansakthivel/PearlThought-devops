/// <reference types="node" />
import type { Logger as LoggerInterface, LoggerOptions } from './types';
export declare class Logger implements LoggerInterface {
    isDebug: boolean;
    isSilent: boolean;
    private nbErrorsCalls;
    private nbWarningsCalls;
    constructor(options?: LoggerOptions);
    private get isNotSilent();
    get errors(): number;
    get warnings(): number;
    get stdout(): (NodeJS.WriteStream & {
        fd: 1;
    }) | undefined;
    get stderr(): (NodeJS.WriteStream & {
        fd: 2;
    }) | undefined;
    setDebug(debug: boolean): this;
    setSilent(silent: boolean): this;
    debug(...args: unknown[]): this;
    error(...args: unknown[]): this;
    info(...args: unknown[]): this;
    raw(...args: unknown[]): this;
    warn(...args: unknown[]): this;
}
export declare const loggerFactory: (options?: LoggerOptions) => Logger;
//# sourceMappingURL=logger.d.ts.map