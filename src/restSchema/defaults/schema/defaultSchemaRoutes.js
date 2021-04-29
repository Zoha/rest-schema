const getRelationPath = require("../../helpers/getRelationPaths")
const relationTypes = require("../../enums/relationTypes")
const manualInvolveMiddlewareList = require("../../helpers/manualInvolveMiddlewareList")
const injectContext = require("../../middleware/registerMiddlewareList")
const { ValidationError, RestSchemaError } = require("../../errors")
const URL = require("url")

/** @type {Object<string , import("../../../../typeDefs/route").route>} */
module.exports = {
  index: {
    name: "index",
    handler: async context => {
      // get the collection
      await context.getCollection()
      // set pagination headers -> x-total, x-page, ...
      await context.setPaginationHeaders()
      // response
      // this method will just get selected inputs
      // and will filter hided fields
      return context.getCollectionResponse()
    }
  },
  count: {
    name: "count",
    path: "/count",
    handler: async context => {
      // will get total documents
      const total = await context.getTotal()
      // return object that includes total property
      return { total }
    }
  },
  single: {
    name: "single",
    path: "/:id",
    handler: async context => {
      // get resource if not exists
      const resource = await context.getResource()
      // call next if resource not found
      if (!resource) {
        return null
      }
      // return resource response
      return context.getResourceResponse()
    }
  },
  create: {
    name: "create",
    method: "post",
    path: "/",
    handler: async context => {
      // sanitize inputs
      // this method will convert input types
      // and also apply all sanitizers
      await context.sanitizeInputs()
      // validate fields
      // this method will return an array that contains
      // all validation errors
      // if validation error was empty
      // mean that we don't have any validation errors
      const validationResult = await context.validateInputs()
      if (validationResult.length) {
        throw new ValidationError("some of validations are failed", validationResult)
      }

      // create resource using model
      // and update context.response
      await context.createResource()
      // return created resource response
      return context.getResourceResponse()
    }
  },
  update: {
    name: "update",
    method: "put",
    path: "/:id",
    handler: async context => {
      // get resource from req params id
      const resource = await context.getResource()
      // if resource not found
      if (!resource) {
        // not found response
        // will call next() without any error
        return null
      }

      // sanitize inputs
      // this method will convert input types
      // and also apply all sanitizers
      await context.sanitizeInputs({ setDirtyInputs: true })

      // validate fields
      // this method will return an array that contains
      // all validation errors
      // if validation error was empty
      // mean that we don't have any validation errors
      const validationResult = await context.validateInputs({ checkRequired: false })
      if (validationResult.length) {
        return context.res.status(400).json(validationResult)
      }

      // update resource
      // and update context.response
      await context.updateResource()

      // return created resource response
      return context.getResourceResponse()
    }
  },
  delete: {
    name: "delete",
    method: "delete",
    path: "/:id",
    handler: async context => {
      // get resource from req params id
      const resource = await context.getResource()
      // if resource not found
      if (!resource) {
        // not found response
        // will call next() without any error
        return null
      }

      // update resource
      // and update context.response
      await context.deleteResource()

      // return created resource response
      return context.getResourceResponse()
    }
  },
  validate: {
    name: "validate",
    method: "post",
    path: "/validate",
    handler: async context => {
      // sanitize inputs
      // this method will convert input types
      // and also apply all sanitizers
      await context.sanitizeInputs()
      // validate fields
      // this method will return an array that contains
      // all validation errors
      // if validation error was empty
      // mean that we don't have any validation errors
      const validationResult = await context.validateInputs()
      if (validationResult.length) {
        return context.res.status(400).json(validationResult)
      }
      // if validation was passed get message from defaults
      const messages = await context.getMessages()
      const message = messages.validationPassed
      return { message }
    }
  },
  relation: {
    name: "relation",
    method: "get",
    path: "/:id/*",
    handler: async (context, req, res, next) => {
      context.relationDepth = context.relationDepth || 1
      if (context.relationDepth > context.schema.maximumRelationDepth) {
        const error = new RestSchemaError(context.getMessages().maximumRelationDepth)
        error.status = 400
        throw error
      }
      // get relations object in format {schemaBuilder , type , fieldName}
      const relations = await context.getRelations()

      // get relation path details {path , fieldName}
      const requestUrl = new URL.URL(context.req.url, "https://example.com").pathname
      const relationPath = getRelationPath(requestUrl)
      // if relation map is invalid or field name not exists in relations
      if (!relationPath || !Object.keys(relations).includes(relationPath.fieldName)) {
        return next()
      }

      // get relation in list of all relations
      const relation = relations[relationPath.fieldName]
      // determine route related to relation type
      let relationRoute

      // if route path is for resource route and there is no more nested
      // or was for collection and there is an id specified for that list
      if (
        (relation.type === relationTypes.resource &&
          relationPath.path.split("/").filter(i => i).length === 1) ||
        (relation.type === relationTypes.collection &&
          relationPath.path.split("/").filter(i => i).length === 2)
      ) {
        relationRoute = relation.schemaBuilder.schema.routes.find(i => i.name === "singleRelation")
        if (!relationRoute) {
          relationRoute = relation.schemaBuilder.schema.routes.find(i => i.name === "single")
        }
      }
      // if route path is for collection route and there is no more nested
      else if (
        relation.type === relationTypes.collection &&
        relationPath.path.split("/").filter(i => i).length === 1
      ) {
        relationRoute = relation.schemaBuilder.schema.routes.find(i => i.name === "indexRelation")
        if (!relationRoute) {
          relationRoute = relation.schemaBuilder.schema.routes.find(i => i.name === "index")
        }
      }
      // if route path is for resource route and there is more nested levels
      else if (
        relation.type === relationTypes.resource &&
        relationPath.path.split("/").filter(i => i).length > 1
      ) {
        relationRoute = relation.schemaBuilder.schema.routes.find(i => i.name === "relation")
      }
      // if route path is for collection route and there is more nested levels
      else if (
        relation.type === relationTypes.collection &&
        relationPath.path.split("/").filter(i => i).length > 2
      ) {
        relationRoute = relation.schemaBuilder.schema.routes.find(i => i.name === "relation")
      }

      if (!relationRoute || !relationRoute.handler) {
        return next()
      }

      // get resource if not exists in context
      const resource = await context.getResource()

      // call next if resource not found
      if (!resource) {
        return next()
      }

      // switch res schema in request and create context
      const createContext = require("../../createContext")
      const relationContext = createContext(relation.schemaBuilder.schema, relationRoute)
      relationContext.isRelation = true
      relationContext.parent = context
      relationContext.res = context.res
      relationContext.relationDepth = context.relationDepth + 1
      const relationPathIdRegexResult = /\/[^/]+\/([^/]+)/.exec(relationPath.path)
      let url = relationPath.path
      if (relation.type == relationTypes.collection && relationRoute.name == "relation") {
        url = relationPath.path.replace(/\/[^/]+/, "")
      }
      relationContext.req = {
        ...context.req,
        rest: relationContext,
        url,
        params: {
          id: relationPathIdRegexResult ? relationPathIdRegexResult[1] : ""
        }
      }

      // get query from find method
      const relationFilters = await relation.field.find(
        resource,
        context,
        relationContext,
        relation
      )
      relationContext.relationFilters = relationFilters
      // call relation schema middleware list manually
      if (!relation.field.withoutMiddleware) {
        const middlewareList = [injectContext(relation.schemaBuilder.schema, relationRoute)]
        await manualInvolveMiddlewareList(relationContext.req, res, middlewareList)
      }

      // call the handler and return result
      return relationRoute.handler(relationContext, relationContext.req, res, next)
    }
  }
}
