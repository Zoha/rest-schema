declare function _exports({ resource, fields, selectInputKey, inputs, routeObject, selectable, loadRelations }?: {
    resource?: resource;
    fields?: fields;
    selectInputKey?: string;
    inputs?: object;
    routeObject?: import("../../../typeDefs/route").route;
    selectable?: boolean;
    loadRelations?: relationObj[];
}): Promise<fields>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
export type field = import("../../../typeDefs/field").field;
export type relationObj = import("./getRelations").relationObj;
export type selectFieldBase = {
    showChildrenByDefault: boolean;
    show: boolean;
    children: selectFieldBase[];
    key: string;
};
