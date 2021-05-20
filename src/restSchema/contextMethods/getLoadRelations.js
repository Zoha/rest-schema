const isArray = require("../helpers/isArray")
const isFunction = require("../helpers/isFunction")
const isObject = require("../helpers/isObject")
const unique = require("../helpers/unique")

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
 * @typedef {import("../../../typeDefs/context").relationObj} relationObj
 */

/**
 * @this context
 * @param {object} [args]
 * @param {boolean} [args.setLoadRelations]
 * @param {object} [args.inputs]
 * @param {string} [args.loadKey]
 * @param {boolean} [args.force]
 * @param {relationObj[]} [args.relations]
 * @param {string| Array.<string>} [args.loads]
 * @returns {Promise.<relationObj[]>}
 */
module.exports = async function({
  setLoadRelations = true,
  inputs = null,
  loadKey = null,
  force = false,
  relations = null,
  loads = null
} = {}) {
  const context = this

  if (!force && context.loadRelations) {
    return context.loadRelations
  }

  inputs = context.cast(inputs).to(Object) || (await context.getInputs())
  loadKey = context.cast(loadKey).to(String) || context.routeObject.meta.load || "load"
  relations = context.cast(relations).to(Array) || (await context.getRelations())

  loads = loads || inputs[loadKey]

  if (typeof loads === "string") {
    loads = loads.split(" ")
  }

  if (!isArray(loads)) {
    loads = []
  }

  let loadRelations = []
  if (loads.length) {
    loadRelations = await unique(
      (
        await Promise.all(
          relations.map(async i => {
            let isLoadable = i.field.loadable
            if (isObject(isLoadable)) {
              isLoadable = isLoadable[context.route]
            }
            if (isFunction(isLoadable)) {
              isLoadable = await isLoadable(context)
            }
            return loads.includes(i.field.nestedKey) && isLoadable && !i.field.hide ? i : false
          })
        )
      ).filter(i => !!i),
      i => i.field.nestedKey,
      context
    )
  }

  if (setLoadRelations) {
    context.loadRelations = loadRelations
  }
  return loadRelations
}
