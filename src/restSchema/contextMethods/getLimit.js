const cast = require("../helpers/cast")

module.exports = async function({
  limit = null,
  maxLimit = null,
  minLimit = null,
  limitKey = null,
  inputs = null
} = {}) {
  const context = this
  let detectedLimit = cast(limit).to(Number) || Number(context.schema.pagination.limit)
  const targetInputs = inputs || context.inputs || (await context.getInputs())
  const limitKeyInInputs = cast(limitKey).to(String) || context.routeObject.meta.limit
  const maximumLimit = cast(maxLimit).to(Number) || context.schema.pagination.maxLimit
  const minimumLimit = cast(minLimit).to(Number) || context.schema.pagination.minLimit

  let defaultLimit = detectedLimit

  if (Number.isNaN(detectedLimit)) {
    detectedLimit = 10
    defaultLimit = detectedLimit
  }

  if (targetInputs[limitKeyInInputs]) {
    detectedLimit = Number(targetInputs[limitKeyInInputs])
    if (detectedLimit > maximumLimit || detectedLimit < minimumLimit) {
      detectedLimit = defaultLimit
    }
    if (Number.isNaN(detectedLimit)) {
      detectedLimit = 10
    }
  }

  if (detectedLimit === 0) {
    return 1
  }
  return detectedLimit
}
