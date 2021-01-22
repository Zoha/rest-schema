const cast = require("../helpers/cast")

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
