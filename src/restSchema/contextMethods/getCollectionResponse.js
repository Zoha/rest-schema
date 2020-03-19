module.exports = async function({ collection = null, fields = null } = {}) {
  const context = this
  await context.hook('beforeGetCollectionResponse')
  collection =
    context.cast(collection).to(Array) || context.collection || (await context.getCollection())
  fields =
    (fields && (await context.getFields({ fields }))) ||
    context.fields ||
    (await context.getFields())

  let finalResponseFromCollection = []
  for (let resource of collection) {
    finalResponseFromCollection.push(await this.getResponseValuesFromResource(fields, resource))
  }
  context.response = finalResponseFromCollection
  await context.hook('beforeGetCollectionResponse')
  return finalResponseFromCollection
}
