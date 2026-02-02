import type { Codemod } from '../codemod';
import type { Version } from '../version';
import type { CodemodRepository as CodemodRepositoryInterface, FindQuery } from './types';
export declare class CodemodRepository implements CodemodRepositoryInterface {
    private groups;
    private versions;
    cwd: string;
    constructor(cwd: string);
    refresh(): this;
    count(version: Version.SemVer): number;
    versionExists(version: Version.SemVer): boolean;
    has(uid: string): boolean;
    find(q: FindQuery): Codemod.VersionedCollection[];
    findByVersion(version: Version.SemVer): Codemod.Codemod[];
    findAll(): Codemod.VersionedCollection[];
    private refreshAvailableVersions;
    private refreshAvailableFiles;
    private refreshAvailableFilesForVersion;
}
export declare const parseCodemodKindFromFilename: (filename: string) => Codemod.Kind;
export declare const codemodRepositoryFactory: (cwd?: string) => CodemodRepository;
//# sourceMappingURL=repository.d.ts.map