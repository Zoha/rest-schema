const isObject = require("../helpers/isObject")
const isArray = require("../helpers/isArray")
const cloneDeep = require("clone-deep")

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
 * @typedef {import("../../../typeDefs/field").fieldType} fieldType
 */

/**
 * @typedef {import("../../../typeDefs/field").field} field
 */

/**
 * @this context
 * @param {object} args
 * @param {string} args.key
 * @param {fields} [args.fields]
 * @returns {Promise.<field>}
 */
module.exports = async function({ key, fields = null }) {
  const context = this
  const targetParts = key.split(".")
  fields =
    (fields && (await context.getFields({ fields, setFields: false }))) ||
    context.fields ||
    (await context.getFields())
  /** @type {*} */
  let operateFields = { children: fields }
  /** @type {field} */
  let foundedField
  let path = ""
  Object.values(targetParts).every(target => {
    path += target + "."
    if (operateFields.type && operateFields.type === Map && operateFields.of) {
      foundedField = cloneDeep(operateFields.of)
      operateFields = foundedField

      foundedField.nestedKey = path.replace(/\.$/, "")
      return true
    } else {
      operateFields = operateFields.children
    }
    if (isObject(operateFields)) {
      if (operateFields[target] == null) {
        foundedField = undefined
        return false
      }
      foundedField = operateFields[target]
      operateFields = operateFields[target]
    } else if (isArray(operateFields)) {
      if (!operateFields.length || Number.isNaN(Number(target))) {
        foundedField = undefined
        return false
      }
      if (operateFields.length < Number(target)) {
        foundedField = cloneDeep(operateFields[(Number(target) % operateFields.length) - 1])
        operateFields = foundedField
        foundedField.nestedKey = path.replace(/\.$/, "")
      } else {
        foundedField = operateFields[target]
        operateFields = operateFields[target]
      }
    } else {
      foundedField = undefined
      return false
    }
    return true
  })

  return foundedField
}
