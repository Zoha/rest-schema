const isObject = require("../helpers/isObject")
const isArray = require("../helpers/isArray")

module.exports = async function({ key, fields = null } = {}) {
  const context = this
  const targetParts = key.split(".")
  fields =
    (fields && (await context.getFields({ fields }))) ||
    context.fields ||
    (await context.getFields())
  fields = { children: fields }
  let foundedField
  Object.values(targetParts).every(target => {
    fields = fields.children
    if (isObject(fields)) {
      if (fields[target] == null) {
        foundedField = undefined
        return false
      }
      foundedField = fields[target]
      fields = fields[target]
    } else if (isArray(fields)) {
      if (!fields.length || Number.isNaN(Number(target))) {
        foundedField = undefined
        return false
      }
      if (fields.length < Number(target)) {
        foundedField = fields[(Number(target) % fields.length) - 1]
        fields = fields[(Number(target) % fields.length) - 1]
      } else {
        foundedField = fields[target]
        fields = fields[target]
      }
    } else {
      foundedField = undefined
      return false
    }
    return true
  })

  return foundedField
}
