declare function _exports({ fields }?: {
    fields?: fields;
}): Promise<fields>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
