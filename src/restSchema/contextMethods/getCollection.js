module.exports = async function({ setCollection = true }) {
  const context = this;
  const filters = context.getFilters();
  const offset = context.getOffset();
  const limit = context.getLimit();

  const collection = await context.model
    .find(filters)
    .offset(offset)
    .limit(limit);

  if (setCollection) {
    context.collection = collection;
  }

  return collection;
};
