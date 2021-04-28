declare function _exports({ skip, inputs, skipInputKey, page, pageInputKey, defaultPage, limit }?: {
    skip?: number;
    inputs?: object;
    skipInputKey?: string;
    page?: number;
    pageInputKey?: string;
    defaultPage?: number;
    limit?: number;
}): Promise<number>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
