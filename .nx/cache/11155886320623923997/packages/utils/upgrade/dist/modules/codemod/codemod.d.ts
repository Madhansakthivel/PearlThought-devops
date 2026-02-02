import type { Codemod as CodemodInterface, FormatOptions, Kind, UID } from './types';
import type { Version } from '../version';
type CreateCodemodPayload = Pick<CodemodInterface, 'kind' | 'version' | 'baseDirectory' | 'filename'>;
export declare class Codemod implements CodemodInterface {
    uid: UID;
    kind: Kind;
    version: Version.SemVer;
    baseDirectory: string;
    filename: string;
    path: string;
    constructor(options: CreateCodemodPayload);
    private createUID;
    format(options?: FormatOptions): string;
}
export declare const codemodFactory: (options: CreateCodemodPayload) => Codemod;
export {};
//# sourceMappingURL=codemod.d.ts.map