const { upperCaseFirst } = require("upper-case-first")
const { singular } = require("pluralize")

const definedSchemaList = {}

const formatName = name => {
  return upperCaseFirst(singular(name))
}

const getSchemaModel = name => {
  const formattedModel = formatName(name)
  if (definedSchemaList[formattedModel] == null) {
    definedSchemaList[formattedModel] = {}
  }
  return definedSchemaList[formattedModel]
}

module.exports = {
  getSchemaModel,
  definedSchemaList
}
