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
 * @param {boolean} [args.setUpdateInputs]
 * @param {fields} [args.updateFields]
 * @returns {Promise.<object>}
 */
module.exports = async function({ setUpdateInputs = true, updateFields = null } = {}) {
  const context = this
  updateFields =
    (updateFields && (await context.getFields({ fields: updateFields, setFields: false }))) ||
    (await context.getUpdateFields())
  const updateInputs = await context.getInputsFromFields({ fields: updateFields })
  if (setUpdateInputs) {
    context.updateInputs = updateInputs
  }
  return updateInputs
}
