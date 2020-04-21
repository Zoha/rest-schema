const cast = require("../helpers/cast")

module.exports = async function({ setTotal = true, filters = null } = {}) {
  const context = this
  filters = cast(filters).to(Object) || (await context.getFilters())

  const total = await context.model.countDocuments(filters)

  if (setTotal) {
    context.total = total
  }
  return total
}
