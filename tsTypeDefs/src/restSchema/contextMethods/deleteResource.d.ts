declare function _exports({ setDeletedResource, resource, filters }?: {
    setDeletedResource?: boolean;
    resource?: resource;
    filters?: boolean;
}): Promise<resource>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
