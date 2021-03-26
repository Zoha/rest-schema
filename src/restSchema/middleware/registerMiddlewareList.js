const isArray = require("../helpers/isArray")
const isFunction = require("../helpers/isFunction")

const getPluginMiddlewareList = (schema, routeObject) => {
  let middlewareList = []
  const pluginMiddlewareList = schema.defaults.defaultPluginMiddlewareList
  if (pluginMiddlewareList) {
    if (pluginMiddlewareList.global) {
      middlewareList = middlewareList.concat(pluginMiddlewareList.global)
    }
    if (pluginMiddlewareList[routeObject.name]) {
      middlewareList = middlewareList.concat(pluginMiddlewareList[routeObject.name])
    }
  }
  return middlewareList
}

const getUserMiddlewareList = (schema, routeObject) => {
  const schemaMiddlewareList = schema.middleware

  if (Array.isArray(schemaMiddlewareList)) {
    // if middleware list was function or an array
    return schemaMiddlewareList
  }

  if (typeof schemaMiddlewareList == "function") {
    return [schemaMiddlewareList]
  }

  let finalUserMiddlewareList = []
  // global middleware
  if (schemaMiddlewareList.global) {
    if (Array.isArray(schemaMiddlewareList.global)) {
      finalUserMiddlewareList = [...schemaMiddlewareList.global]
    } else if (isFunction(schemaMiddlewareList.global)) {
      finalUserMiddlewareList.push(schemaMiddlewareList.global)
    }
  }
  // route middleware
  if (schemaMiddlewareList[routeObject.name]) {
    if (Array.isArray(schemaMiddlewareList[routeObject.name])) {
      finalUserMiddlewareList = [
        ...finalUserMiddlewareList,
        ...schemaMiddlewareList[routeObject.name]
      ]
    } else if (isFunction(schemaMiddlewareList[routeObject.name])) {
      finalUserMiddlewareList.push(schemaMiddlewareList[routeObject.name])
    }
  }

  return finalUserMiddlewareList
}

const getRouteMiddlewares = (schema, routeObject) => {
  if (isArray(routeObject.middleware)) {
    return routeObject
  }
  return routeObject.middleware || []
}

module.exports = (schema, routeObject) => {
  return [
    ...getPluginMiddlewareList(schema, routeObject),
    ...getUserMiddlewareList(schema, routeObject),
    ...getRouteMiddlewares(schema, routeObject)
  ]
}
