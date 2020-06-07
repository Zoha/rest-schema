const { defaultMessages } = require("../defaults")
const cast = require("../helpers/cast")

module.exports = (newMessages, { target = defaultMessages } = {}) => {
  newMessages = cast(newMessages).to(Object)
  if (!newMessages) {
    return
  }

  // set validation messages
  if (newMessages.validations) {
    module.exports.setDefaultValidationMessages(newMessages.validations, {
      target: target.validations
    })
    delete newMessages.validations
  }

  Object.entries(newMessages).forEach(([key, value]) => {
    target[key] = value
  })
}

module.exports.setDefaultValidationMessages = (
  validationMessages,
  { target = defaultMessages.validations } = {}
) => {
  validationMessages = cast(validationMessages).to(Object)
  if (!validationMessages) {
    return
  }

  Object.entries(validationMessages).forEach(([key, value]) => {
    target[key] = value
  })
}
