declare function _exports({ filters, relationFilters }?: {
    filters?: object;
    route?: string;
    routes?: routes;
    relationFilters?: object;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type route = import("../../../typeDefs/route").route;
export type routes = route[];
