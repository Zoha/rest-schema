declare function _exports({ key, req, inputsTargets }: {
    key: string;
    req?: string;
    inputsTargets?: string;
}): Promise<resource>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
