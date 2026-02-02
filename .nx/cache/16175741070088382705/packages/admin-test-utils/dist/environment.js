'use strict';

var jestEnvironmentJsdom = require('jest-environment-jsdom');

class CustomJSDOMEnvironment extends jestEnvironmentJsdom.TestEnvironment {
    constructor(...args){
        super(...args);
        // TODO: remove once https://github.com/jsdom/jsdom/issues/3363 is closed.
        this.global.structuredClone = structuredClone;
    }
}

module.exports = CustomJSDOMEnvironment;
//# sourceMappingURL=environment.js.map
