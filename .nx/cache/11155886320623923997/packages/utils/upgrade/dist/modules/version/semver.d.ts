import semver from 'semver';
import * as Version from './types';
export declare const semVerFactory: (version: string) => Version.SemVer;
export declare const isLiteralSemVer: (str: string) => str is `${number}.${number}.${number}`;
export declare const isValidSemVer: (str: string) => boolean;
export declare const isSemverInstance: (value: unknown) => value is semver.SemVer;
export declare const isSemVerReleaseType: (str: string) => str is Version.ReleaseType;
//# sourceMappingURL=semver.d.ts.map