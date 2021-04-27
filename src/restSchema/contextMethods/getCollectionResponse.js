/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

const setOnContext = require("../helpers/setOnContext")

/**
 * @typedef {import("../../../typeDefs/field").fields} fields
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @this context
 * @param {object} [args]
 * @param {Array.<resource>} [args.collection]
 * @param {fields} [args.fields]
 * @returns {Promise.<object>}
 */
module.exports = async function({ collection = null, fields = null } = {}) {
  const context = this
  await context.hook("beforeGetCollectionResponse")
  const detectedCollection =
    context.cast(collection).to(Array) || context.collection || (await context.getCollection())
  fields =
    (fields && (await context.getFields({ fields, setFields: false }))) ||
    context.fields ||
    (await context.getFields())

  const finalResponseFromCollectionPromises = []
  Object.values(detectedCollection).forEach(async resource => {
    finalResponseFromCollectionPromises.push(
      context.getResponseValuesFromResource({ fields: fields, resource })
    )
  })
  const finalResponseFromCollection = await Promise.all(finalResponseFromCollectionPromises)
  setOnContext(context, "response", finalResponseFromCollection)
  await context.hook("afterGetCollectionResponse")
  return finalResponseFromCollection
}
