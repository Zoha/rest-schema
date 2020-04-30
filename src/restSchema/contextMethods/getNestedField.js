const isObject = require("../helpers/isObject")
const isArray = require("../helpers/isArray")
const cloneDeep = require("clone-deep")

module.exports = async function({ key, fields = null } = {}) {
  const context = this
  const targetParts = key.split(".")
  fields =
    (fields && (await context.getFields({ fields }))) ||
    context.fields ||
    (await context.getFields())
  fields = { children: fields }
  let foundedField
  let path = ""
  Object.values(targetParts).every(target => {
    path += target + "."
    if (fields.type && fields.type === Map && fields.of) {
      foundedField = cloneDeep(fields.of)
      fields = foundedField

      foundedField.nestedKey = path.replace(/\.$/, "")
      return true
    } else {
      fields = fields.children
    }
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
        foundedField = cloneDeep(fields[(Number(target) % fields.length) - 1])
        fields = foundedField
        foundedField.nestedKey = path.replace(/\.$/, "")
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
