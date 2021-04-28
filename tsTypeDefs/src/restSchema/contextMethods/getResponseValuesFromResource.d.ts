declare function _exports({ fields, resource, selectFields }?: {
    fields?: fields;
    resource?: resource;
    selectFields?: fields;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
