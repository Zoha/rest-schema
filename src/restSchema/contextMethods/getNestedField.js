const isObject = require("../helpers/isObject")
const isArray = require("../helpers/isArray")

module.exports = async function(targetString) {
  const context = this
  const targetParts = targetString.split(".")
  let nestedForwardFields = context.fields || (await context.getFields())
  nestedForwardFields = { children: nestedForwardFields }
  let foundedField
  Object.values(targetParts).every(target => {
    nestedForwardFields = nestedForwardFields.children
    if (isObject(nestedForwardFields)) {
      if (nestedForwardFields[target] == null) {
        foundedField = undefined
        return false
      }
      foundedField = nestedForwardFields[target]
      nestedForwardFields = nestedForwardFields[target]
    } else if (isArray(nestedForwardFields)) {
      if (!nestedForwardFields.length || Number.isNaN(Number(target))) {
        foundedField = undefined
        return false
      }
      if (nestedForwardFields.length < Number(target)) {
        foundedField = nestedForwardFields[(Number(target) % nestedForwardFields.length) - 1]
        nestedForwardFields = nestedForwardFields[(Number(target) % nestedForwardFields.length) - 1]
      } else {
        foundedField = nestedForwardFields[target]
        nestedForwardFields = nestedForwardFields[target]
      }
    } else {
      foundedField = undefined
      return false
    }
    return true
  })

  return foundedField
}
