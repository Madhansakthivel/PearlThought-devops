import type { Requirement as RequirementInterface, RequirementTestCallback, TestContext, TestResult } from './types';
export declare class Requirement implements RequirementInterface {
    readonly isRequired: boolean;
    readonly name: string;
    readonly testCallback: RequirementTestCallback | null;
    children: RequirementInterface[];
    constructor(name: string, testCallback: RequirementTestCallback | null, isRequired?: boolean);
    setChildren(children: RequirementInterface[]): this;
    addChild(child: RequirementInterface): this;
    asOptional(): Requirement;
    asRequired(): Requirement;
    test(context: TestContext): Promise<TestResult>;
}
export declare const requirementFactory: (name: string, testCallback: RequirementTestCallback | null, isRequired?: boolean) => Requirement;
//# sourceMappingURL=requirement.d.ts.map