import { cloneDeep, get, has, merge, set, omit } from 'lodash/fp';

class JSONTransformAPI {
    get(path, defaultValue) {
        if (!path) {
            return this.root();
        }
        return cloneDeep(get(path, this.json) ?? defaultValue);
    }
    has(path) {
        return has(path, this.json);
    }
    merge(other) {
        this.json = merge(other, this.json);
        return this;
    }
    root() {
        return cloneDeep(this.json);
    }
    set(path, value) {
        this.json = set(path, value, this.json);
        return this;
    }
    remove(path) {
        this.json = omit(path, this.json);
        return this;
    }
    constructor(json){
        this.json = cloneDeep(json);
    }
}
const createJSONTransformAPI = (object)=>new JSONTransformAPI(object);

export { JSONTransformAPI, createJSONTransformAPI };
//# sourceMappingURL=transform-api.mjs.map
