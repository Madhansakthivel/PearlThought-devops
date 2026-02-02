import { TestEnvironment } from 'jest-environment-jsdom';
export default class CustomJSDOMEnvironment extends TestEnvironment {
    constructor(...args: ConstructorParameters<typeof TestEnvironment>);
}
