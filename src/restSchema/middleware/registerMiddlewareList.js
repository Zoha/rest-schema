const isFunction = require("../helpers/isFunction")

module.exports = (schema, routeObject) => {
  const schemaMiddlewareList = schema.middleware

  if (Array.isArray(schemaMiddlewareList) || typeof schemaMiddlewareList == "function") {
    // if middleware list was function or an array
    return schemaMiddlewareList
  }

  let finalMiddlewareList = []
  // global middleware
  if (schemaMiddlewareList.global) {
    if (Array.isArray(schemaMiddlewareList.global)) {
      finalMiddlewareList = [...schemaMiddlewareList.global]
    } else if (isFunction(schemaMiddlewareList.global)) {
      finalMiddlewareList.push(schemaMiddlewareList.global)
    }
  }
  if (schemaMiddlewareList[routeObject.name]) {
    if (Array.isArray(schemaMiddlewareList[routeObject.name])) {
      finalMiddlewareList = [...finalMiddlewareList, ...schemaMiddlewareList[routeObject.name]]
    } else if (isFunction(schemaMiddlewareList[routeObject.name])) {
      finalMiddlewareList.push(schemaMiddlewareList[routeObject.name])
    }
  }
  return finalMiddlewareList
}
