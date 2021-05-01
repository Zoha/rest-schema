declare function _exports({ filters, sort, limit, select, page, skip, inputs, setInputs, force, route }?: {
    filters?: object;
    sort?: number;
    limit?: number;
    select?: string;
    page?: number;
    skip?: number;
    inputs?: object;
    setInputs?: boolean;
    force?: boolean;
    route?: any;
}): Promise<object>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
