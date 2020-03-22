const { validationMessages } = require("../defaults/defaultMessages")

module.exports = async function() {
  const context = this
  const routeKeys = context.getRouteKeys()
  const { cast } = context

  const { req } = context

  if (!req.params || !req.params.id) {
    throw new Error(validationMessages.idParamNotFound)
  }

  const filters = []
  const gettingFieldsPromises = routeKeys.map(i => context.getNestedField(i))

  const fields = await Promise.all(gettingFieldsPromises)
  fields.forEach(field => {
    let castedValue
    if (field) {
      castedValue = cast(req.params.id).to(field.type)
    }
    if (castedValue != null) {
      filters.push({
        [field.nestedKey]: castedValue
      })
    }
  })
  return filters
}
