declare function _exports({ setDirtyInputs, force, inputs, resource }?: {
    setDirtyInputs?: boolean;
    inputs?: object;
    resource?: resource;
    force?: boolean;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
