declare function _exports({ setResource, setCreatedResource, inputs }?: {
    setResource?: boolean;
    setCreatedResource?: boolean;
    inputs?: object;
}): Promise<resource>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
