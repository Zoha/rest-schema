declare function _exports({ fields, setRelations, force }?: {
    fields?: fields;
    setRelations?: boolean;
    force?: boolean;
}): Promise<relationObj[]>;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
export type fields = import("../../../typeDefs/field").fields;
export type field = import("../../../typeDefs/field").field;
export type relationObj = {
    schemaBuilder: import("../schemaBuilder");
    type: ('collection' | 'resource');
    field: field;
    fieldName: string;
    isNested: boolean;
};
