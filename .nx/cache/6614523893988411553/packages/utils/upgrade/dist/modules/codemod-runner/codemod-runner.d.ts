import type { Logger } from '../logger';
import type { Project } from '../project';
import type { CodemodRunnerInterface, CodemodRunnerReport, SelectCodemodsCallback } from './types';
import type { Version } from '../version';
export declare class CodemodRunner implements CodemodRunnerInterface {
    private readonly project;
    private range;
    private isDry;
    private logger;
    private selectCodemodsCallback;
    constructor(project: Project, range: Version.Range);
    setRange(range: Version.Range): this;
    setLogger(logger: Logger): this;
    onSelectCodemods(callback: SelectCodemodsCallback | null): this;
    dry(enabled?: boolean): this;
    private createRepository;
    private safeRunAndReport;
    runByUID(uid: string, codemodsDirectory?: string): Promise<CodemodRunnerReport>;
    run(codemodsDirectory?: string): Promise<CodemodRunnerReport>;
}
export declare const codemodRunnerFactory: (project: Project, range: Version.Range) => CodemodRunner;
//# sourceMappingURL=codemod-runner.d.ts.map