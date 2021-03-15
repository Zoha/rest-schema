const cast = require("../helpers/cast")

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
 * @param {resource} [args.resource]
 * @returns {Promise.<object>}
 */
module.exports = async function({ resource = null } = {}) {
  const context = this
  await context.hook("beforeGetResourceResponse")
  resource = cast(resource).to(Object) || context.resource || (await context.getResource())
  const response = await this.getResponseValuesFromResource({
    fields: context.fields,
    resource
  })
  context.response = response
  await context.hook("afterGetResourceResponse")
  return response
}
