declare function _exports({ setCollection, force, filters, skip, limit, sort, filtersMeta }?: {
    setCollection?: boolean;
    force?: boolean;
    filters?: object;
    skip?: number;
    limit?: number;
    sort?: object;
    filtersMeta?: object;
}): Promise<Array<resource>>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
