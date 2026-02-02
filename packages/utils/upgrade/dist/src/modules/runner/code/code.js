'use strict';

var Runner = require('jscodeshift/src/Runner');
var runner = require('../runner.js');

class CodeRunner extends runner.AbstractRunner {
    valid(codemod) {
        return codemod.kind === 'code';
    }
    constructor(...args){
        super(...args), this.runner = Runner.run;
    }
}
const codeRunnerFactory = (paths, configuration)=>{
    return new CodeRunner(paths, configuration);
};

exports.CodeRunner = CodeRunner;
exports.codeRunnerFactory = codeRunnerFactory;
//# sourceMappingURL=code.js.map
