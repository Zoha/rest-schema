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
 * @returns {Promise.<resource>}
 */
module.exports = async function({
  errorOnNotFound = false,
  setResource = true,
  force = false,
  resourceId = null,
  model = null,
  filters = null
} = {}) {
  const context = this

  const validationMessages = (await context.getMessages()).validations
  model = model || context.model
  filters = cast(filters).to(Object) || {}

  await context.hook("beforeGetResource")

  if (!force && context.resource) {
    return context.resource
  }

  // find the resource by route keys
  let resource
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

  if (errorOnNotFound && !resource) {
    throw new NotFoundError(validationMessages.resourceNotFound)
  }

  if (setResource && !!resource) {
    context.resource = resource
  }
  await context.hook("afterGetResource")

  return resource
}
