const { upperCaseFirst } = require("upper-case-first")
const { singular } = require("pluralize")
const SchemaBuilder = require("./schemaBuilder")
const { definedSchemaList } = require("./getSchemaModel")

const formatName = name => {
  return upperCaseFirst(singular(name))
}

/**
 * adds new schema to restSchema
 * @param {schema} RSSchema schema
 * @returns {RsSchemaBuilder} added schema
 */
const addSchemaModel = schema => {
  let schemaName = schema.name
  if (schemaName == null) {
    schemaName = `Schema${Object.keys(definedSchemaList).length}`
  }
  definedSchemaList[formatName(schemaName)] = new SchemaBuilder(schema)
  return definedSchemaList[formatName(schemaName)]
}

module.exports = {
  addSchemaModel
}
