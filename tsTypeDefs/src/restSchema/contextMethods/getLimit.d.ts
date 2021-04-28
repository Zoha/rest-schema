declare function _exports({ defaultLimit, maxLimit, minLimit, limitKey, inputs }?: {
    defaultLimit?: number;
    maxLimit?: number;
    minLimit?: number;
    limitKey?: string;
    inputs?: object;
}): Promise<number>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
