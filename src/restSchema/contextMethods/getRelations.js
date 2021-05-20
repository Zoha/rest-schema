const { getSchemaModel } = require("../getSchemaModel")
const relationTypes = require("../enums/relationTypes")
const unique = require("../helpers/unique")

/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @typedef {import("../../../typeDefs/field").fields} fields
 * @typedef {import("../../../typeDefs/field").field} field
 */

/**
 * @typedef {object} relationObj
 * @property {import("../schemaBuilder")} schemaBuilder
 * @property {('collection' | 'resource')} type
 * @property {field} field
 * @property {string} fieldName
 * @property {string} nestedKey
 * @property {string} nestedKeyWithoutArrayIndex
 * @property {boolean} isNested
 */

/**
 *
 * @param {fields} fields
 * @param {context} context
 * @returns {Object.<string ,relationObj>}
 */
const getRelations = async (fields, context, isNested = false) => {
  /** @type {relationObj} */
  let relations = []
  await Promise.all(
    Object.keys(fields).map(async fieldName => {
      /** @type {field} */
      const field = fields[fieldName]
      if (!field) {
        return
      }
      const isArrayOfRef = field.type == Array && (field.children[0].ref || field.ref)
      let ref = isArrayOfRef ? field.children[0].ref || field.ref : field.ref
      const refPath = isArrayOfRef ? field.children[0].refPath || field.refPath : field.refPath
      if (refPath) {
        const inputs = await context.getInputs()
        ref = await context.getNestedInput({ key: refPath, inputs })
      }
      if (ref) {
        const relationSchemaBuilder =
          ref && ref.constructor && ref.constructor.name === "SchemaBuilder"
            ? ref
            : getSchemaModel(ref)
        if (relationSchemaBuilder) {
          relations.push({
            schemaBuilder: relationSchemaBuilder,
            type: isArrayOfRef ? relationTypes.collection : relationTypes.resource,
            field,
            fieldName,
            nestedKey: field.nestedKey,
            nestedKeyWithoutArrayIndex: field.nestedKey.replace(/\.\d+\./g, "."),
            isNested
          })
        }
      } else if (field.isNested) {
        const nestedResult = await getRelations(field.children, context, true)
        relations = [...relations, ...nestedResult]
      }
    })
  )
  return relations
}

/**
 * @this context
 * @param {object} [args]
 * @param {fields} [args.fields]
 * @param {boolean} [args.setRelations]
 * @param {boolean} [args.force]
 * @returns {Promise.<relationObj[]>}
 */
module.exports = async function({ fields = null, setRelations = true, force = false } = {}) {
  const context = this
  if (!force && context.relations) {
    return context.relations
  }
  fields =
    (fields && (await context.getFields({ fields, setFields: false }))) ||
    context.fields ||
    (await context.getFields())

  const relations = await unique(
    await getRelations(fields, context),
    i => i.field.nestedKey,
    context
  )

  if (setRelations) {
    context.relations = relations
  }
  return relations
}
