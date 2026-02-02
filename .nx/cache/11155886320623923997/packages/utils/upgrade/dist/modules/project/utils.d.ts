import { AppProject, PluginProject } from './project';
export declare const isPluginProject: (project: unknown) => project is PluginProject;
export declare function assertPluginProject(project: unknown): asserts project is PluginProject;
export declare const isApplicationProject: (project: unknown) => project is AppProject;
export declare function assertAppProject(project: unknown): asserts project is AppProject;
//# sourceMappingURL=utils.d.ts.map