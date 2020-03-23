const messages = require("../defaultMessages")

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
        return context.res.status(400).json(validationResult)
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
      const message = messages.validationPassed
      return { message }
    }
  }
}
