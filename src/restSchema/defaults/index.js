const defaultField = require("./defaultField")
const defaultMessages = require("./defaultMessages")
const defaultRoute = require("./defaultRoute")
const defaultSchema = require("./defaultSchema")
const defaultPluginMiddlewareList = require("./defaultPluginMiddlewareList")
const defaultPluginHooks = require("./defaultPluginHooks")

/**
 * @typedef {import("../../../typeDefs/field").field} field
 */

/**
 * @typedef {import("./defaultMessages")} messages
 */

/**
 * @typedef {import("../../../typeDefs/route").route} route
 */

/**
 * @typedef {import("../../../typeDefs/schema").schema} schema
 */

/**
 * @typedef {import("../../../typeDefs/schema").hooks} hooks
 */

/**
 * @typedef {import("../../../typeDefs/schema").middleware} middleware
 */

/**
 * @typedef {object} defaults
 * @property {field} defaultField
 * @property {messages} defaultMessages
 * @property {route} defaultRoute
 * @property {schema} defaultSchema
 * @property {schema} defaultPluginMiddlewareList
 * @property {hooks} defaultPluginHooks
 */

/** @type {defaults} */
const defaults = {
  defaultField,
  defaultMessages,
  defaultRoute,
  defaultSchema,
  defaultPluginMiddlewareList,
  defaultPluginHooks
}
module.exports = defaults
