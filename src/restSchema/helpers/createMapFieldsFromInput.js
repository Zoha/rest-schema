const cloneDeep = require("clone-deep")

module.exports = (eachInputItemField, argInputs) => {
  const newFields = {}
  // add fields as arg input length
  Object.keys(argInputs).forEach(key => {
    newFields[key] = eachInputItemField
  })

  // format each field for primary data
  const formattedNewFields = {}
  Object.keys(newFields).forEach(fieldKey => {
    const field = cloneDeep(newFields[fieldKey])
    field.key = fieldKey
    field.nestedKey = field.nestedKey.replace("{keyName}", fieldKey) || fieldKey
    formattedNewFields[fieldKey] = field
  })

  return formattedNewFields
}
