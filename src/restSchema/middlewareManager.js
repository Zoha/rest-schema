const defaultSchemaRoutes = require("./defaults/schema/defaultSchemaRoutes")

/**
 * @typedef {import("../../typeDefs/schema").middleware} middleware
 */

class MiddlewareManager {
  constructor() {
    this.defaultRoutes = Object.keys(defaultSchemaRoutes)
    this.middlewareList = {}
    this.setDefaultMiddlewareList()
  }

  /**
   * @private
   */
  setDefaultMiddlewareList() {
    const middlewareList = {
      global: []
    }
    for (const routeName of this.defaultRoutes) {
      middlewareList[routeName] = []
    }
    this.middlewareList = middlewareList
  }

  /**
   *
   * @param {(Array<string>| string)} route
   * @param {middleware | middleware[]} middleware
   * @return {MiddlewareManager}
   */
  addToRoute(route, middleware) {
    if (Array.isArray(route)) {
      for (const routeItem of route) {
        this.addToRoute(routeItem, middleware)
      }
    } else {
      route = route.toLowerCase()
      if (!this.middlewareList[route]) {
        this.middlewareList[route] = []
      }
      if (!Array.isArray(middleware)) {
        middleware = [middleware]
      }
      for (const item of middleware) {
        this.middlewareList[route].push(item)
      }
    }
    return this
  }

  /**
   * @param {middleware | middleware[]} middleware
   * @return {MiddlewareManager}
   */
  addToGlobal(middleware) {
    this.addToRoute("global", middleware)
    return this
  }

  /**
   * @param {middleware | middleware[]} middleware
   * @param {string | Array<string>} exceptRoutes
   * @return {MiddlewareManager}
   */
  add(middleware, exceptRoutes = []) {
    if (!Array.isArray(exceptRoutes)) {
      exceptRoutes = [exceptRoutes]
    }
    const targetRoutes = Object.keys(this.middlewareList).filter(
      i => !exceptRoutes.includes(i) && i !== "global"
    )
    this.addToRoute(targetRoutes, middleware)
    return this
  }

  /**
   * @param {string | Array<string>} exceptRoutes
   * @param {middleware | middleware[]} middleware
   * @return {MiddlewareManager}
   */
  addToAllRoutesExcept(exceptRoutes, middleware) {
    this.add(middleware, exceptRoutes)
    return this
  }

  /**
   * @param {string | Array<string>} targetRoutes
   * @param {middleware | middleware[]} middleware
   * @return {MiddlewareManager}
   */
  addToThisRoutes(targetRoutes, middleware) {
    this.addToRoute(targetRoutes, middleware)
    return this
  }

  /**
   * @returns {middleware}
   */
  get() {
    return this.middlewareList
  }
}

module.exports = MiddlewareManager
