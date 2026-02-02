import { AbstractRunner } from '../runner.mjs';
import { transformJSON } from './transform.mjs';

class JSONRunner extends AbstractRunner {
    valid(codemod) {
        return codemod.kind === 'json';
    }
    constructor(...args){
        super(...args), this.runner = transformJSON;
    }
}
const jsonRunnerFactory = (paths, configuration)=>{
    return new JSONRunner(paths, configuration);
};

export { JSONRunner, jsonRunnerFactory };
//# sourceMappingURL=json.mjs.map
