declare function _exports({ setTotal, filters, force }?: {
    setTotal?: boolean;
    filters?: object;
    force?: boolean;
}): Promise<number>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
