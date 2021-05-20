declare function _exports({ inputs, operators, defaultRouteFilters, customFilters, filteringMeta, pagination, includeRelationFilters, includeRelationsInResult }?: {
    inputs?: object;
    operators?: import("../../../typeDefs/route").filteringOperators;
    defaultRouteFilters?: object;
    customFilters?: object;
    filteringMeta?: object;
    pagination?: paginationProps;
    includeRelationFilters?: false;
    includeRelationsInResult?: boolean;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
export type paginationProps = import("../../../typeDefs/schema").paginationProps;
