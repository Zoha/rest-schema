const isArray = require("./isArray")
const cloneDeep = require("clone-deep")

module.exports = (argFields, argInputs) => {
  if (isArray(argFields) && argFields.length < argInputs.length) {
    const specifiedCount = argFields.length
    const loopCount = Math.ceil((argInputs.length - argFields.length) / specifiedCount)
    let fields = []
    for (let i = 0; i < loopCount; i += 1) {
      fields = [...argFields, ...argFields.slice(0, specifiedCount)]
    }
    fields = fields.slice(0, argInputs.length).map((field, index) => {
      field = cloneDeep(field)
      field.key = index
      field.nestedKey = field.nestedKey.replace(/\d+$/, index) || index
      return field
    })
    return fields
  }
  return argFields
}
