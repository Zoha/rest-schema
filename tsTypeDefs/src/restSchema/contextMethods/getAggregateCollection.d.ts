declare function _exports({ setCollection, force, filters, skip, limit, sort, search, sortRelations, filterRelations }?: {
    setCollection?: boolean;
    force?: boolean;
    filters?: object;
    skip?: number;
    limit?: number;
    sort?: object;
    search?: string;
    sortRelations?: relationObj[];
    filterRelations?: relationObj[];
}): Promise<Array<resource>>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type relationObj = import("./getRelations").relationObj;
