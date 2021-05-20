declare function _exports({ setSearch, inputs, searchKey }?: {
    setSearch?: boolean;
    inputs?: object;
    searchKey?: string;
}): Promise<number>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
