const cloneDeep = require("clone-deep")
const defaults = require("./defaults")
const setters = require("./set")
const express = require("express")
const registerRoute = require("./registerRoute")
const schemaFormatter = require("./schemaFormatters/schemaFormatter")
const createContext = require("./createContext")
const deepmerge = require("deepmerge")
const { default: isPlainObject } = require("is-plain-object")

class SchemaBuilder {
  /**
   *
   * @param {import("../../typeDefs/schema").schema} schema
   */
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
      // @ts-ignore // will be fixed with schema formatter
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

  /**
   * @typedef {import("./schemaBuilder")} schemaBuilder
   * @param {import("../../typeDefs/schema").model} model
   * @param {import("../../typeDefs/field").fields} fields
   * @param {import("../../typeDefs/schema").schema} options
   * @returns {schemaBuilder}
   */
  extend(model, fields, schema) {
    const clonedSchema = deepmerge(this.schema, schema, {
      isMergeableObject: isPlainObject
    })
    clonedSchema.fields = deepmerge(this.schema.fields, fields)
    clonedSchema.model = model || this.schema.model
    return require("./schema")(clonedSchema.model, clonedSchema.fields, clonedSchema)
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
    return setters.setDefaultSchemaWrappers(...args)
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
