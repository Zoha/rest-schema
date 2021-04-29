declare function _exports({ skip, inputs, skipInputKey, page, pageInputKey, defaultPage, limit, pagination }?: {
    skip?: number;
    inputs?: object;
    skipInputKey?: string;
    page?: number;
    pageInputKey?: string;
    defaultPage?: number;
    limit?: number;
    pagination?: paginationProps;
}): Promise<number>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
export type paginationProps = import("../../../typeDefs/schema").paginationProps;
