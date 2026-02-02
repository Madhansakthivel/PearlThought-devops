import { run } from 'jscodeshift/src/Runner';
import { AbstractRunner } from '../runner.mjs';

class CodeRunner extends AbstractRunner {
    valid(codemod) {
        return codemod.kind === 'code';
    }
    constructor(...args){
        super(...args), this.runner = run;
    }
}
const codeRunnerFactory = (paths, configuration)=>{
    return new CodeRunner(paths, configuration);
};

export { CodeRunner, codeRunnerFactory };
//# sourceMappingURL=code.mjs.map
