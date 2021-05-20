declare function _exports({ setCollection, force, filters, skip, limit, sort, filtersMeta, canUseAggregate, search }?: {
    setCollection?: boolean;
    force?: boolean;
    filters?: object;
    skip?: number;
    limit?: number;
    sort?: object;
    filtersMeta?: object;
    canUseAggregate?: boolean;
    search?: string;
}): Promise<Array<resource>>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
