import type { AppProject, PluginProject, ProjectType } from '../project';
import type { Codemod } from '../codemod';
import type { Version } from '../version';
import type { Report } from '../report';
export declare const path: (path: string) => string;
export declare const version: (version: Version.LiteralVersion | Version.SemVer) => string;
export declare const codemodUID: (uid: string) => string;
export declare const projectDetails: (project: AppProject | PluginProject) => string;
export declare const projectType: (type: ProjectType) => string;
export declare const versionRange: (range: Version.Range) => string;
export declare const transform: (transformFilePath: string) => string;
export declare const highlight: (arg: unknown) => string;
export declare const upgradeStep: (text: string, step: [current: number, total: number]) => string;
export declare const reports: (reports: Report.CodemodReport[]) => string;
export declare const codemodList: (codemods: Codemod.List) => string;
export declare const durationMs: (elapsedMs: number) => string;
//# sourceMappingURL=formats.d.ts.map