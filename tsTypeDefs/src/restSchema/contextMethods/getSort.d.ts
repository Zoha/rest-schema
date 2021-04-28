declare function _exports({ inputs, sortKey, defaultSort, sortString }?: {
    sortKey?: string;
    inputs?: object;
    defaultSort?: object;
    sortString?: string;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
