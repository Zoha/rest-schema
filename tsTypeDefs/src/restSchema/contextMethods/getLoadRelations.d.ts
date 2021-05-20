declare function _exports({ setLoadRelations, inputs, loadKey, force, relations, loads }?: {
    setLoadRelations?: boolean;
    inputs?: object;
    loadKey?: string;
    force?: boolean;
    relations?: relationObj[];
    loads?: string | Array<string>;
}): Promise<relationObj[]>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
export type relationObj = import("../../../typeDefs/context").relationObj;
