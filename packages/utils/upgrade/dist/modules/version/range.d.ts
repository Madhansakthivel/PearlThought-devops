import semver from 'semver';
import * as Version from './types';
export declare const rangeFactory: (range: string) => Version.Range;
export declare const rangeFromReleaseType: (current: Version.SemVer, identifier: Version.ReleaseType) => semver.Range;
export declare const rangeFromVersions: (currentVersion: Version.SemVer, target: Version.ReleaseType | Version.SemVer) => semver.Range;
export declare const isValidStringifiedRange: (str: string) => boolean;
export declare const isRangeInstance: (range: unknown) => range is semver.Range;
//# sourceMappingURL=range.d.ts.map