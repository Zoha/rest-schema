const schemaFormatter = require("./schemaFormatters/schemaFormatter")
const { addSchemaModel } = require("./addSchemaModel")
const { getSchemaModel } = require("./getSchemaModel")
const { InvalidArgumentError } = require("./errors")

/**
 * @typedef {import("./schemaBuilder")} schemaBuilder
 * @param {import("../../typeDefs/schema").model} model
 * @param {import("../../typeDefs/field").fields} fields
 * @param {import("../../typeDefs/schema").schema} options
 * @returns {schemaBuilder}
 */
const schemaModelBuilder = (model, fields, options = {}) => {
  if (fields !== undefined) {
    const schema = schemaFormatter({ model, fields, ...options })
    return addSchemaModel(schema)
  }
  if (typeof model === "string") {
    return getSchemaModel(model)
  }

  throw new InvalidArgumentError(
    `model name should be a string, ${typeof model} given. remember that for creating schema second parameter is required`
  )
}

module.exports = schemaModelBuilder
