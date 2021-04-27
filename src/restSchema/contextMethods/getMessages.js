const { defaultMessages } = require("../defaults")

/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @typedef {import("../defaults/defaultMessages")} messages
 */

/**
 * @typedef {import("../../../typeDefs/field").fields} fields
 */

/**
 * @this context
 * @returns {messages}
 */
module.exports = function() {
  const context = this
  if (context.defaults) {
    return context.defaults.defaultMessages
  }
  return defaultMessages
}
