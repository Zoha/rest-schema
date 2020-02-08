module.exports = async function() {
  const context = this;
  const filters = context.getFilters();

  const total = await context.model.countDocuments(filters);

  context.total = total;
  return total;
};
