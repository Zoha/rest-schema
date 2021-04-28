declare function _exports({ inputs, operators, defaultRouteFilters, customFilters, filteringMeta }?: {
    inputs?: object;
    operators?: import("../../../typeDefs/route").filteringOperators;
    defaultRouteFilters?: object;
    customFilters?: object;
    filteringMeta?: object;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
