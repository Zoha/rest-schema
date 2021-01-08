module.exports = async function({ collection = null, fields = null } = {}) {
  const context = this
  await context.hook("beforeGetCollectionResponse")
  const detectedCollection =
    context.cast(collection).to(Array) || context.collection || (await context.getCollection())
  fields =
    (fields && (await context.getFields({ fields, setFields: false }))) ||
    context.fields ||
    (await context.getFields())

  const finalResponseFromCollectionPromises = []
  Object.values(detectedCollection).forEach(async resource => {
    finalResponseFromCollectionPromises.push(
      context.getResponseValuesFromResource({ fields: fields, resource })
    )
  })
  const finalResponseFromCollection = await Promise.all(finalResponseFromCollectionPromises)
  context.response = finalResponseFromCollection
  await context.hook("afterGetCollectionResponse")
  return finalResponseFromCollection
}
