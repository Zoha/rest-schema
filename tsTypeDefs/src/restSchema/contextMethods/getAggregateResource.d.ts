declare function _exports({ errorOnNotFound, setResource, force, filters, resourceId }?: {
    errorOnNotFound?: boolean;
    setResource?: boolean;
    force?: boolean;
    filters?: object;
    resourceId?: any;
}): Promise<Array<resource>>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type relationObj = import("./getRelations").relationObj;
