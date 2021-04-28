export = schemaModelBuilder;
/**
 * @typedef {import("./schemaBuilder")} schemaBuilder
 * @param {import("../../typeDefs/schema").model} model
 * @param {import("../../typeDefs/field").fields} fields
 * @param {import("../../typeDefs/schema").schema} options
 * @returns {schemaBuilder}
 */
declare function schemaModelBuilder(model: any, fields: import("../../typeDefs/field").fields, options?: import("../../typeDefs/schema").schema): schemaBuilder;
declare namespace schemaModelBuilder {
    export { schemaBuilder };
}
type schemaBuilder = import("./schemaBuilder");
