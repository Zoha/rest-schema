declare function _exports({ setValidationErrors, fields, inputs, checkRequired }?: {
    setValidationErrors?: boolean;
    fields?: fields;
    inputs?: object;
    checkRequired?: boolean;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
