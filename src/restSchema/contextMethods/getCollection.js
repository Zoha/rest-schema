module.exports = async function({
  setCollection = true,
  force = false,
  filters = null,
  skip = null,
  limit = null
} = {}) {
  const context = this
  await context.hook("beforeGetCollection")

  if (!force && context.collection) {
    return context.collection
  }

  filters = Number(filters) || (await context.getFilters())
  skip = Number(skip) || (await context.getSkip())
  limit = Number(limit) || (await context.getLimit())

  const collection = await context.model
    .find(filters)
    .skip(skip)
    .limit(limit)

  if (setCollection) {
    context.collection = collection
  }
  await context.hook("afterGetCollection")

  return collection
}
