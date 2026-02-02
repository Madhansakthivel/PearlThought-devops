import { AbstractRunner } from '../runner';
import type { Codemod } from '../../codemod';
import type { JSONRunnerConfiguration } from './types';
export declare class JSONRunner extends AbstractRunner<JSONRunnerConfiguration> {
    runner: (codemodPath: string, paths: string[], config: JSONRunnerConfiguration) => Promise<import("../../report/types").Report>;
    valid(codemod: Codemod.Codemod): boolean;
}
export declare const jsonRunnerFactory: (paths: string[], configuration: JSONRunnerConfiguration) => JSONRunner;
//# sourceMappingURL=json.d.ts.map