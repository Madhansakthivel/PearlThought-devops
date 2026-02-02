import { Version } from '../../modules/version';
import type { Project } from '../../modules/project';
export declare const resolvePath: (cwd?: string) => string;
export declare const getRangeFromTarget: (currentVersion: Version.SemVer, target: Version.ReleaseType | Version.LiteralSemVer) => Version.Range;
export declare const findRangeFromTarget: (project: Project, target: Version.ReleaseType | Version.LiteralSemVer | Version.Range) => Version.Range;
//# sourceMappingURL=utils.d.ts.map