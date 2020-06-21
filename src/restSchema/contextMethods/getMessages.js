const defaults = require("../defaults")

const { defaultMessages } = require("../defaults")

module.exports = function() {
  const context = this
  if (context.defaults) {
    return context.defaults.defaultMessages
  }
  return defaultMessages
}
