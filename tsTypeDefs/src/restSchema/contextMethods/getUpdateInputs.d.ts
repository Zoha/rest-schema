declare function _exports({ setUpdateInputs, updateFields }?: {
    setUpdateInputs?: boolean;
    updateFields?: fields;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
