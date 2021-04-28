declare function _exports({ collection, fields }?: {
    collection?: Array<resource>;
    fields?: fields;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type fields = import("../../../typeDefs/field").fields;
export type context = import("../../../typeDefs/context").context;
