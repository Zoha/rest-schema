export = SchemaBuilder;
declare class SchemaBuilder {
    /**
     *
     * @param {import("../../typeDefs/schema").schema} schema
     */
    constructor(schema: import("../../typeDefs/schema").schema);
    defaults: any;
    schema: import("../../typeDefs/schema").schema;
    name: string;
    tempContext: import("../../typeDefs/context").context;
    createTempContext(): import("../../typeDefs/context").context;
    resource(): import("express-serve-static-core").Router;
    use(callback: any): any;
    /**
     * @typedef {import("./schemaBuilder")} schemaBuilder
     * @param {import("../../typeDefs/schema").model} model
     * @param {import("../../typeDefs/field").fields} fields
     * @param {import("../../typeDefs/schema").schema} options
     * @returns {schemaBuilder}
     */
    extend(model: import("../../typeDefs/schema").model, fields: import("../../typeDefs/field").fields, schema: any): SchemaBuilder;
    setDefaultField(...args: any[]): void;
    setDefaultMessages(...args: any[]): void;
    setDefaultValidationMessages(...args: any[]): void;
    setDefaultRoute(...args: any[]): void;
    setDefaultRouteMeta(...args: any[]): void;
    setDefaultRouteFilteringOperators(...args: any[]): void;
    setDefaultSchema(...args: any[]): void;
    setDefaultSchemaFields(...args: any[]): void;
    setDefaultSchemaPagination(...args: any[]): void;
    setDefaultSchemaRoutes(...args: any[]): void;
    setDefaultSchemaWrappers(...args: any[]): void;
    addMiddleware(...args: any[]): void;
    addHook(...args: any[]): void;
}
