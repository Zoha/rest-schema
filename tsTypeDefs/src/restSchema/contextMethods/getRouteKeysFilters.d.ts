declare function _exports({ routeKeys, req, id, idKey, idTarget, fallbackFilters }?: {
    routeKeys?: string[];
    req?: request;
    id?: any;
    idKey?: string;
    idTarget?: string;
    fallbackFilters?: object;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
export type request = import("../../../typeDefs/context").request;
