declare function _exports({ setResource, setUpdatedResource, resource, filters, inputs }?: {
    setResource?: boolean;
    setUpdatedResource?: boolean;
    resource?: resource;
    filters?: object;
    inputs?: object;
}): Promise<resource>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
