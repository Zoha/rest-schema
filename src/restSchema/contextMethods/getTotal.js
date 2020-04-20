module.exports = async function({ setTotal = true, filters = null } = {}) {
  const context = this
  filters = filters || (await context.getFilters())

  const total = await context.model.countDocuments(filters)

  if (setTotal) {
    context.total = total
  }
  return total
}
