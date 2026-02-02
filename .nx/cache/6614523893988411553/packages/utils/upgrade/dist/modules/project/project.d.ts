import type { Version } from '../version';
import type { Codemod } from '../codemod';
import type { Report } from '../report';
import type { FileExtension, MinimalPackageJSON, ProjectConfig, RunCodemodsOptions } from './types';
export declare class Project {
    cwd: string;
    files: string[];
    packageJSONPath: string;
    packageJSON: MinimalPackageJSON;
    readonly paths: string[];
    constructor(cwd: string, config: ProjectConfig);
    getFilesByExtensions(extensions: FileExtension[]): string[];
    refresh(): this;
    runCodemods(codemods: Codemod.List, options: RunCodemodsOptions): Promise<Report.CodemodReport[]>;
    private createProjectCodemodsRunners;
    private refreshPackageJSON;
    private refreshProjectFiles;
}
export declare class AppProject extends Project {
    strapiVersion: Version.SemVer;
    readonly type: "application";
    /**
     * Returns an array of allowed file paths for a Strapi application
     *
     * The resulting paths include app default files and the root package.json file.
     */
    private static get paths();
    constructor(cwd: string);
    refresh(): this;
    private refreshStrapiVersion;
    private findStrapiVersionFromProjectPackageJSON;
    private findLocallyInstalledStrapiVersion;
}
export declare class PluginProject extends Project {
    readonly type: "plugin";
    /**
     * Returns an array of allowed file paths for a Strapi plugin
     *
     * The resulting paths include plugin default files, the root package.json file, and plugin-specific files.
     */
    private static get paths();
    constructor(cwd: string);
}
export declare const projectFactory: (cwd: string) => AppProject | PluginProject;
//# sourceMappingURL=project.d.ts.map