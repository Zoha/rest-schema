const { getSchemaModel } = require("../getSchemaModel")

module.exports = async (value, modelName) => {
  const schemaModel = getSchemaModel(modelName)
  if (!schemaModel) {
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
