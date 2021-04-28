declare function _exports({ value, field, key }: {
    value?: any;
    field: field;
    key?: string;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
export type field = import("../../../typeDefs/field").field;
