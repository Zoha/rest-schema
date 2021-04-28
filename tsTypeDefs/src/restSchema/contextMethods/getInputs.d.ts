declare function _exports({ setInputs, req, inputsTarget, force }?: {
    setInputs?: boolean;
    req?: request;
    inputsTarget?: string[];
    force?: boolean;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
export type request = import("../../../typeDefs/context").request;
