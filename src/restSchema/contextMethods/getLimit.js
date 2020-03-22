module.exports = function() {
  const context = this
  let limit = Number(context.schema.pagination.limit)
  let defaultLimit = limit
  const { inputs } = this
  const limitKey = context.routeObject.meta.limit
  const { maxLimit, minLimit } = context.schema.pagination

  if (Number.isNaN(limit)) {
    limit = 10
    defaultLimit = limit
  }

  if (inputs[limitKey]) {
    limit = Number(inputs[limitKey])
    if (limit > maxLimit || limit < minLimit) {
      limit = defaultLimit
    }
    if (Number.isNaN(limit)) {
      limit = 10
    }
  }

  if (limit === 0) {
    return 1
  }
  return limit
}
