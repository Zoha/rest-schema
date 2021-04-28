declare function _exports({ setCreateInputs, fields, inputs }?: {
    setCreateInputs?: boolean;
    fields?: fields;
    inputs?: object;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
