const cast = require("../helpers/cast")
const deepMergeFilters = require("../helpers/deepMergeFilters")
const { NotFoundError } = require("../errors")

/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @typedef {import("../../../typeDefs/field").fields} fields
 */

/**
 * @typedef {import("../../../typeDefs/context").model} model
 */

/**
 * @this context
 * @param {object} [args]
 * @param {boolean} [args.errorOnNotFound]
 * @param {boolean} [args.setResource]
 * @param {boolean} [args.force]
 * @param {*} [args.resourceId]
 * @param {model} [args.model]
 * @param {object} [args.filters]
 * @param {boolean} [args.canUseAggregate]
 * @returns {Promise.<resource>}
 */
module.exports = async function({
  errorOnNotFound = false,
  setResource = true,
  force = false,
  resourceId = null,
  model = null,
  filters = null,
  canUseAggregate = true
} = {}) {
  const context = this

  await context.hook("beforeGetResource")

  if (!force && context.resource) {
    return context.resource
  }

  // check if there is load request use aggregate instead
  let resource
  const loadRelations = await context.getLoadRelations()
  if (loadRelations.length && canUseAggregate) {
    resource = await context.getAggregateResource({
      setResource: false,
      errorOnNotFound,
      force,
      filters,
      resourceId
    })
  } else {
    model = model || context.model
    filters = cast(filters).to(Object) || {}

    // find the resource by route keys
    if (resourceId != null) {
      resource = await model.findOne({
        _id: resourceId
      })
    } else {
      let getRouteKeysFilters = {}
      getRouteKeysFilters = {
        $or: await context.getRouteKeysFilters()
      }
      if (!getRouteKeysFilters.$or.length) {
        getRouteKeysFilters = {}
      }
      let finalFilters = deepMergeFilters([
        getRouteKeysFilters,
        await context.getCustomFilters(),
        filters
      ])
      if (Object.keys(finalFilters).length) {
        resource = await model.findOne(finalFilters)
      }
    }
  }

  if (errorOnNotFound && !resource) {
    const validationMessages = (await context.getMessages()).validations
    throw new NotFoundError(validationMessages.resourceNotFound)
  }

  if (setResource && !!resource) {
    context.resource = resource
  }
  await context.hook("afterGetResource")

  return resource
}
