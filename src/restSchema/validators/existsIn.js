const isObject = require("../helpers/isObject")
const { getSchemaModel } = require("../getSchemaModel")
const mongoose = require("mongoose")
const isFunction = require("../helpers/isFunction")

module.exports = async (value, modelName) => {
  if (isFunction(modelName) && modelName.prototype instanceof mongoose.Model) {
    modelName = modelName.collection.collectionName
  } else if (
    isFunction(modelName) &&
    modelName instanceof require("../schemaBuilder").SchemaBuilder
  ) {
    modelName = modelName.name
  }
  const schemaModel = getSchemaModel(modelName)
  if (
    !schemaModel ||
    (isObject(schemaModel) && Object.getOwnPropertyNames(schemaModel).length === 0)
  ) {
    return false
  }

  schemaModel.tempContext.req = {
    params: {
      id: value
    }
  }

  const resource = await schemaModel.tempContext.getResource({
    errorOnNotFound: false,
    setResource: false,
    force: true
  })

  delete schemaModel.tempContext.req.params

  return !!resource
}
