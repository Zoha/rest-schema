const { resource } = require("./index")
const cloneDeep = require("clone-deep")
const defaults = require("./defaults")
const setters = require("./set")

/**
 * @class
 * @type {import("../../jsDocs").RSSchemaBuilder}
 */
module.exports = class schemaBuilder {
  constructor(schema) {
    this.defaults = cloneDeep(defaults)
    this.schema = schema
    this.schema.defaults = this.defaults
    this.name = schema.name
  }

  resource() {
    return resource(this.schema)
  }

  use(callback) {
    return callback(this)
  }

  setDefaultField(...args) {
    args[1] = args[1] || {}
    args[1].target = this.defaults.defaultField
    return setters.setDefaultField(...args)
  }

  setDefaultMessages(...args) {
    args[1] = args[1] || {}
    args[1].target = this.defaults.defaultMessages
    return setters.setDefaultMessages(...args)
  }

  setDefaultValidationMessages(...args) {
    args[1] = args[1] || {}
    args[1].target = this.defaults.defaultMessages.validations
    return setters.setDefaultValidationMessages(...args)
  }

  setDefaultRoute(...args) {
    args[1] = args[1] || {}
    args[1].target = this.defaults.defaultRoute
    return setters.setDefaultRoute(...args)
  }

  setDefaultRouteMeta(...args) {
    args[1] = args[1] || {}
    args[1].target = this.defaults.defaultRoute.meta
    return setters.setDefaultRouteMeta(...args)
  }

  setDefaultRouteFilteringOperators(...args) {
    args[1] = args[1] || {}
    args[1].target = this.defaults.defaultRoute.filteringOperators
    return setters.setDefaultRouteFilteringOperators(...args)
  }

  setDefaultSchema(...args) {
    args[1] = args[1] || {}
    args[1].target = this.defaults.defaultSchema
    return setters.setDefaultSchema(...args)
  }

  setDefaultSchemaFields(...args) {
    args[1] = args[1] || {}
    args[1].target = this.defaults.defaultSchema.fields
    return setters.setDefaultSchemaFields(...args)
  }

  setDefaultSchemaPagination(...args) {
    args[1] = args[1] || {}
    args[1].target = this.defaults.defaultSchema.pagination
    return setters.setDefaultSchemaPagination(...args)
  }

  setDefaultSchemaRoutes(...args) {
    args[1] = args[1] || {}
    args[1].target = this.defaults.defaultSchema.routes
    return setters.setDefaultSchemaRoutes(...args)
  }

  setDefaultSchemaWrappers(...args) {
    args[1] = args[1] || {}
    args[1].target = this.defaults.defaultSchema.wrappers
    return setters.something(...args)
  }

  addMiddleware(...args) {
    args[1] = args[1] || {}
    args[1].target = this.defaults.defaultPluginMiddlewareList
    return setters.addMiddleware(...args)
  }

  addHook(...args) {
    args[1] = args[1] || {}
    args[1].target = this.defaults.defaultPluginHooks
    return setters.addHook(...args)
  }
}
