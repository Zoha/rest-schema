const isArray = require("./isArray")

module.exports = (argFields, argInputs) => {
  if (isArray(argFields) && argFields.length < argInputs.length) {
    const specifiedCount = argFields.length
    const loopCount = Math.ceil((argInputs.length - argFields.length) / specifiedCount)
    let fields = []
    for (let i = 0; i < loopCount; i += 1) {
      fields = [...argFields, ...argFields.slice(0, specifiedCount)]
    }
    fields = fields.slice(0, argInputs.length)
    return fields
  }
  return argFields
}
