const schemaFormatter = require("./schemaFormatters/schemaFormatter")
const { addSchemaModel } = require("./addSchemaModel")
const { getSchemaModel } = require("./getSchemaModel")
const { InvalidArgumentError } = require("./errors")
require("../../jsDocs")

/**
 * @type {import("../../jsDocs").RSSchemaModelBuilder}
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
