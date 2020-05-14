module.exports = schema => {
  const { name } = schema
  if (name) {
    return name
  }
  const { model } = schema
  if (!model) {
    throw new Error("model is not defined for getting schema name")
  }
  if (model.collection && model.collection.collectionName) {
    return model.collection.collectionName
  }
  if (model.name) {
    return model.name
  }
  return "noname"
}
