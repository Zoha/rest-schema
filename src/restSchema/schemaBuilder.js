const cloneDeep = require("clone-deep")
const defaults = require("./defaults")
const setters = require("./set")
const express = require("express")
const registerRoute = require("./registerRoute")
const schemaFormatter = require("./schemaFormatters/schemaFormatter")
const createContext = require("./createContext")

class SchemaBuilder {
  constructor(schema) {
    this.defaults = cloneDeep(defaults)
    this.schema = schema
    this.schema.defaults = this.defaults
    this.name = schema.name
    this.tempContext = this.createTempContext()
  }

  createTempContext() {
    // create base context
    const context = createContext(
      this.schema,
      this.schema.routes.filter(i => i.name == "single")
    )
    context.req = {}
    context.res = {}
    return context
  }

  resource() {
    // format schema and merge it with default
    const schema = schemaFormatter(this.schema)
    // create express router
    const router = express.Router()
    // register routes
    Object.values(schema.routes).forEach(route => {
      registerRoute(router, route, schema)
    })

    return router
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
    args[2] = args[2] || {}
    args[2].target = this.defaults.defaultPluginMiddlewareList
    return setters.addMiddleware(...args)
  }

  addHook(...args) {
    args[3] = args[3] || {}
    args[3].target = this.defaults.defaultPluginHooks
    return setters.addHook(...args)
  }
}

module.exports = SchemaBuilder
