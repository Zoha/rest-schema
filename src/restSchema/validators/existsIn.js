const { isObject } = require("lodash")
const { getSchemaModel } = require("../getSchemaModel")

module.exports = async (value, modelName) => {
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
