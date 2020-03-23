const { upperCaseFirst } = require("upper-case-first")
const { singular } = require("pluralize")
const schemaFormatter = require("./schemaFormatters/schemaFormatter")
const SchemaBuilder = require("./schemaBuilder")

const definedSchemaList = {}

const formatName = name => {
  return upperCaseFirst(singular(name))
}

module.exports = (model, fields, options = {}) => {
  if (fields !== undefined) {
    const schema = schemaFormatter({ model, fields, ...options })
    let schemaName = schema.name
    if (schemaName == null) {
      schemaName = `Schema${Object.keys(definedSchemaList).length}`
    }
    definedSchemaList[formatName(schemaName)] = new SchemaBuilder(schema)
    return schema
  }
  if (typeof model === "string") {
    const formattedModel = formatName(model)
    if (definedSchemaList[formattedModel] == null) {
      throw new Error(`there is no schema with ${formattedModel} name`)
    }
    return definedSchemaList[formattedModel]
  }

  throw new Error(
    `model name should be a string for getting schema, ${typeof model} given. remember that for creating schema second parameter is required`
  )
}
