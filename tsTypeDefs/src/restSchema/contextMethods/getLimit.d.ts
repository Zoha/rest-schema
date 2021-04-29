declare function _exports({ defaultLimit, maxLimit, minLimit, limitKey, inputs, pagination }?: {
    defaultLimit?: number;
    maxLimit?: number;
    minLimit?: number;
    limitKey?: string;
    inputs?: object;
    pagination?: paginationProps;
}): Promise<number>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
export type paginationProps = import("../../../typeDefs/schema").paginationProps;
