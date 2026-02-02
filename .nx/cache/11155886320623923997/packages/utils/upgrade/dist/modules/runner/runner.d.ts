import type { Codemod } from '../codemod';
import type { Runner as RunnerInterface, RunnerConfiguration, RunnerFunction } from './types';
export declare abstract class AbstractRunner<TConfig extends RunnerConfiguration> implements RunnerInterface<TConfig> {
    abstract runner: RunnerFunction<TConfig>;
    paths: string[];
    configuration: TConfig;
    constructor(paths: string[], configuration: TConfig);
    run(codemod: Codemod.Codemod, configuration?: TConfig): Promise<import("../report/types").Report>;
    abstract valid(codemod: Codemod.Codemod): boolean;
}
//# sourceMappingURL=runner.d.ts.map