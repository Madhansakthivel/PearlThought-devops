class Requirement {
    setChildren(children) {
        this.children = children;
        return this;
    }
    addChild(child) {
        this.children.push(child);
        return this;
    }
    asOptional() {
        const newInstance = requirementFactory(this.name, this.testCallback, false);
        newInstance.setChildren(this.children);
        return newInstance;
    }
    asRequired() {
        const newInstance = requirementFactory(this.name, this.testCallback, true);
        newInstance.setChildren(this.children);
        return newInstance;
    }
    async test(context) {
        try {
            await this.testCallback?.(context);
            return ok();
        } catch (e) {
            if (e instanceof Error) {
                return errored(e);
            }
            if (typeof e === 'string') {
                return errored(new Error(e));
            }
            return errored(new Error('Unknown error'));
        }
    }
    constructor(name, testCallback, isRequired){
        this.name = name;
        this.testCallback = testCallback;
        this.isRequired = isRequired ?? true;
        this.children = [];
    }
}
const ok = ()=>({
        pass: true,
        error: null
    });
const errored = (error)=>({
        pass: false,
        error
    });
const requirementFactory = (name, testCallback, isRequired)=>new Requirement(name, testCallback, isRequired);

export { Requirement, requirementFactory };
//# sourceMappingURL=requirement.mjs.map
