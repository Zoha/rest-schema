declare function _exports({ inputs, sortKey, defaultSort, sortString, pagination, includeRelationSorts, includeRelationsInResult }?: {
    sortKey?: string;
    inputs?: object;
    defaultSort?: object;
    sortString?: string;
    pagination?: paginationProps;
    includeRelationSorts?: boolean;
    includeRelationsInResult?: boolean;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
export type paginationProps = import("../../../typeDefs/schema").paginationProps;
