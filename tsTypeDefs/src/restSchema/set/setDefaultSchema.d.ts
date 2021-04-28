declare function _exports(newDefaultSchema: any, { target, mergeFields, mergeRoutes }?: {
    target?: import("../../../typeDefs/schema").schema;
    mergeFields?: boolean;
    mergeRoutes?: boolean;
}): void;
declare namespace _exports {
    function setDefaultSchemaFields(newDefaultSchemaFields: any, { target }?: {
        target?: import("../../../typeDefs/field").fields;
    }): void;
    function setDefaultSchemaRoutes(newDefaultSchemaRoutes: any, { target }?: {
        target?: import("../../../typeDefs/route").routes;
    }): void;
    function setDefaultSchemaPagination(newDefaultSchemaPagination: any, { target }?: {
        target?: import("../../../typeDefs/schema").pagination;
    }): void;
    function setDefaultSchemaWrappers(newDefaultSchemaWrappers: any, { target }?: {
        target?: import("../../../typeDefs/schema").wrappers;
    }): void;
}
export = _exports;
