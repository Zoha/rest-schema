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

  const detectedFilters = Number(filters) || (await context.getFilters())
  const detectedSkip = Number(skip) || (await context.getSkip())
  const detectedLimit = Number(limit) || (await context.getLimit())

  const collection = await context.model
    .find(detectedFilters)
    .skip(detectedSkip)
    .limit(detectedLimit)

  if (setCollection) {
    context.collection = collection
  }
  await context.hook("afterGetCollection")

  return collection
}
