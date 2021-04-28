declare function _exports({ key, inputs }: {
    key: string;
    inputs?: object;
}): Promise<any>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
