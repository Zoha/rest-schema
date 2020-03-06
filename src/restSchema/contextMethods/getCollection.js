module.exports = async function({ setCollection = true, force = false } = {}) {
  const context = this;
  await context.hook("beforeGetCollection");

  if (!force && context.collection) {
    return context.collection;
  }

  const filters = await context.getFilters();
  const skip = await context.getSkip();
  const limit = await context.getLimit();

  const collection = await context.model
    .find(filters)
    .skip(skip)
    .limit(limit);

  if (setCollection) {
    context.collection = collection;
  }
  await context.hook("afterGetCollection");

  return collection;
};
