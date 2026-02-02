import { run as jscodeshift } from 'jscodeshift/src/Runner';
import { AbstractRunner } from '../runner';
import type { Codemod } from '../../codemod';
import type { CodeRunnerConfiguration } from './types';
export declare class CodeRunner extends AbstractRunner<CodeRunnerConfiguration> {
    runner: typeof jscodeshift;
    valid(codemod: Codemod.Codemod): boolean;
}
export declare const codeRunnerFactory: (paths: string[], configuration: CodeRunnerConfiguration) => CodeRunner;
//# sourceMappingURL=code.d.ts.map