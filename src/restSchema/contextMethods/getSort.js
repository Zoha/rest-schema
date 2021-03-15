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
 * @this context
 * @param {object} [args]
 * @param {string} [args.sortKey]
 * @param {object} [args.inputs]
 * @param {object} [args.defaultSort]
 * @param {string} [args.sortString]
 * @returns {Promise.<object>}
 */
module.exports = async function({
  inputs = null,
  sortKey = null,
  defaultSort = null,
  sortString = null
} = {}) {
  const context = this
  inputs = cast(inputs).to(Object) || context.inputs || (await context.getInputs())
  sortKey = cast(sortKey).to(String) || context.routeObject.meta.sort || "sort"
  let sort = cast(defaultSort).to(Object) || context.schema.pagination.sort
  sortString = cast(sortString).to(String) || inputs[sortKey]
  if (sortString && typeof sortString === "string") {
    const sortsObject = {}
    const requestedSorts = sortString.split(" ")

    const formatRequestedSort = async requestedSort => {
      if (!requestedSort) {
        return
      }
      const requestedSortKey = requestedSort.replace(/^-/, "")
      // if type of field not found return undefined
      const field = await context.getNestedField({ key: requestedSortKey })

      if (field == null || !field.sortable) {
        return
      }

      if (typeof field.sortable === "function" && !(await field.sortable(context))) {
        return
      }

      let orderOperator = 1
      if (/^-/.test(requestedSort)) {
        orderOperator = -1
      }
      sortsObject[requestedSortKey] = orderOperator
    }

    const formattingRequestedSortsPromises = []
    Object.values(requestedSorts).forEach(requestedSort => {
      formattingRequestedSortsPromises.push(formatRequestedSort(requestedSort))
    })
    await Promise.all(formattingRequestedSortsPromises)
    sort = sortsObject
  }
  return sort
}
