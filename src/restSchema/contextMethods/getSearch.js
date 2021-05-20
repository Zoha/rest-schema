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
 * @this context
 * @param {object} [args]
 * @param {boolean} [args.setSearch]
 * @param {object} [args.inputs]
 * @param {string} [args.searchKey]
 * @returns {Promise.<number>}
 */
module.exports = async function({ setSearch = true, inputs = null, searchKey = null } = {}) {
  const context = this

  inputs = context.cast(inputs).to(Object) || (await context.getInputs())
  searchKey = context.cast(searchKey).to(String) || context.routeObject.meta.search || "search"

  const search = inputs[searchKey]

  if (setSearch) {
    context.search = search
  }
  return search
}
