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
 * @param {boolean} [args.setCreateInputs]
 * @param {fields} [args.fields]
 * @param {object} [args.inputs]
 * @returns {Promise.<object>}
 */
module.exports = async function({ setCreateInputs = true, fields = null, inputs = null } = {}) {
  const context = this
  fields =
    (fields && (await context.getFields({ fields, setFields: false }))) ||
    (await context.getCreateFields())
  const createInputs = cast(inputs).to(Object) || (await context.getInputsFromFields({ fields }))
  if (setCreateInputs) {
    context.createInputs = createInputs
  }
  return createInputs
}
