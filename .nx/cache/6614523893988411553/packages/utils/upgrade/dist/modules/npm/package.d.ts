import type { Package as PackageInterface, NPMPackageVersion } from './types';
import type { Version } from '../version';
import { Logger } from '../logger';
export declare class Package implements PackageInterface {
    name: string;
    cwd: string;
    private logger;
    private npmPackage;
    constructor(name: string, cwd: string, logger: Logger);
    get isLoaded(): boolean;
    private assertPackageIsLoaded;
    getVersionsDict(): Record<string, NPMPackageVersion>;
    getVersionsAsList(): NPMPackageVersion[];
    findVersionsInRange(range: Version.Range): NPMPackageVersion[];
    private getRegistryFromPackageManager;
    private determineRegistryUrl;
    findVersion(version: Version.SemVer): NPMPackageVersion | undefined;
    refresh(): Promise<this>;
    versionExists(version: Version.SemVer): boolean;
}
export declare const npmPackageFactory: (name: string, cwd: string, logger: Logger) => Package;
//# sourceMappingURL=package.d.ts.map