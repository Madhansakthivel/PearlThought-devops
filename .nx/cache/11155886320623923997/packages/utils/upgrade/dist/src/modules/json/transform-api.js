'use strict';

var fp = require('lodash/fp');

class JSONTransformAPI {
    get(path, defaultValue) {
        if (!path) {
            return this.root();
        }
        return fp.cloneDeep(fp.get(path, this.json) ?? defaultValue);
    }
    has(path) {
        return fp.has(path, this.json);
    }
    merge(other) {
        this.json = fp.merge(other, this.json);
        return this;
    }
    root() {
        return fp.cloneDeep(this.json);
    }
    set(path, value) {
        this.json = fp.set(path, value, this.json);
        return this;
    }
    remove(path) {
        this.json = fp.omit(path, this.json);
        return this;
    }
    constructor(json){
        this.json = fp.cloneDeep(json);
    }
}
const createJSONTransformAPI = (object)=>new JSONTransformAPI(object);

exports.JSONTransformAPI = JSONTransformAPI;
exports.createJSONTransformAPI = createJSONTransformAPI;
//# sourceMappingURL=transform-api.js.map
