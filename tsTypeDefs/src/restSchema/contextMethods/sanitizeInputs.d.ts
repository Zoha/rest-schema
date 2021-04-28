declare function _exports({ setInputs, fields, inputs, setDirtyInputs }?: {
    setInputs?: boolean;
    fields?: fields;
    inputs?: object;
    setDirtyInputs?: boolean;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
