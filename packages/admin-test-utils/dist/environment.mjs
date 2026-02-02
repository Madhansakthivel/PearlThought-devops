import { TestEnvironment } from 'jest-environment-jsdom';

class CustomJSDOMEnvironment extends TestEnvironment {
    constructor(...args){
        super(...args);
        // TODO: remove once https://github.com/jsdom/jsdom/issues/3363 is closed.
        this.global.structuredClone = structuredClone;
    }
}

export { CustomJSDOMEnvironment as default };
//# sourceMappingURL=environment.mjs.map
