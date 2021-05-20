declare function _exports({ errorOnNotFound, setResource, force, resourceId, model, filters, canUseAggregate }?: {
    errorOnNotFound?: boolean;
    setResource?: boolean;
    force?: boolean;
    resourceId?: any;
    model?: model;
    filters?: object;
    canUseAggregate?: boolean;
}): Promise<resource>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
export type model = import("../../../typeDefs/context").model;
