const { getSchemaModel } = require("../getSchemaModel")
const relationTypes = require("../enums/relationTypes")

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
 * @param {fields} [args.fields]
 * @returns {Promise.<object>}
 */
module.exports = async function({ fields = null } = {}) {
  const context = this
  fields =
    (fields && (await context.getFields({ fields, setFields: false }))) ||
    context.fields ||
    (await context.getFields())

  const relations = {}
  await Promise.all(
    Object.keys(fields).map(async fieldName => {
      const field = fields[fieldName]
      if (!field) {
        return
      }
      const isArrayOfRef = field.type == Array && field.children[0].ref
      let ref = isArrayOfRef ? field.children[0].ref : field.ref
      const refPath = isArrayOfRef ? field.children[0].refPath : field.refPath
      if (refPath) {
        const inputs = await context.getResource()
        ref = await context.getNestedInput({ key: refPath, inputs })
      }
      if (ref) {
        const relationSchemaBuilder =
          ref && ref.constructor && ref.constructor.name === "SchemaBuilder"
            ? ref
            : getSchemaModel(ref)
        if (relationSchemaBuilder) {
          relations[fieldName] = {
            schemaBuilder: relationSchemaBuilder,
            type: isArrayOfRef ? relationTypes.collection : relationTypes.resource,
            field,
            fieldName
          }
        }
      }
    })
  )
  return relations
}
