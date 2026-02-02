import type { Utils } from '@strapi/types';
import type { JSONTransformAPI as JSONTransformAPIInterface } from './types';
export declare class JSONTransformAPI implements JSONTransformAPIInterface {
    private json;
    constructor(json: Utils.JSONObject);
    get<T extends Utils.JSONValue>(path: string): T | undefined;
    get<T extends Utils.JSONValue>(path: string, defaultValue: T): T;
    has(path: string): boolean;
    merge(other: Utils.JSONObject): this;
    root(): Utils.JSONObject;
    set(path: string, value: Utils.JSONValue): this;
    remove(path: string): this;
}
export declare const createJSONTransformAPI: (object: Utils.JSONObject) => JSONTransformAPI;
//# sourceMappingURL=transform-api.d.ts.map