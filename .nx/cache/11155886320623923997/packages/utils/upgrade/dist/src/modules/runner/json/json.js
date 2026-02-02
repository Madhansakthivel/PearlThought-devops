'use strict';

var runner = require('../runner.js');
var transform = require('./transform.js');

class JSONRunner extends runner.AbstractRunner {
    valid(codemod) {
        return codemod.kind === 'json';
    }
    constructor(...args){
        super(...args), this.runner = transform.transformJSON;
    }
}
const jsonRunnerFactory = (paths, configuration)=>{
    return new JSONRunner(paths, configuration);
};

exports.JSONRunner = JSONRunner;
exports.jsonRunnerFactory = jsonRunnerFactory;
//# sourceMappingURL=json.js.map
