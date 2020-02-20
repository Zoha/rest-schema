module.exports = async function({ setTotal = true } = {}) {
  const context = this;
  const filters = await context.getFilters();

  const total = await context.model.countDocuments(filters);

  if (setTotal) {
    context.total = total;
  }
  return total;
};
