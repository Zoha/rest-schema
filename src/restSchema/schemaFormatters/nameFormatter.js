module.exports = schema => {
  const { model } = schema
  if (!model) {
    throw new Error("model is not defined for getting schema name")
  }
  if (model.name) {
    return model.name
  }
  return "noname"
}
