'use strict';

class AbstractRunner {
    async run(codemod, configuration) {
        const isValidCodemod = this.valid(codemod);
        if (!isValidCodemod) {
            throw new Error(`Invalid codemod provided to the runner: ${codemod.filename}`);
        }
        const runConfiguration = {
            ...this.configuration,
            ...configuration
        };
        return this.runner(codemod.path, this.paths, runConfiguration);
    }
    constructor(paths, configuration){
        this.paths = paths;
        this.configuration = configuration;
    }
}

exports.AbstractRunner = AbstractRunner;
//# sourceMappingURL=runner.js.map
