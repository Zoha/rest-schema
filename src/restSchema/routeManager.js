/**
 * @typedef {import("../../typeDefs/route").routes} routes
 * @typedef {import("../../typeDefs/route").route} route
 */

class RouteManager {
  /**
   * @param {routes} routes
   */
  constructor(routes) {
    this.routes = Object.values(routes)
  }

  /**
   * @param {route | route[]} newRoute
   * @return {RouteManager}
   */
  add(newRoute) {
    if (Array.isArray(newRoute)) {
      for (const route of newRoute) {
        this.add(route)
      }
    } else {
      this.routes = [...this.routes, newRoute]
    }
    return this
  }

  /**
   * @param {route | route[]} newRoute
   * @return {RouteManager}
   */
  addRoute(newRoute) {
    return this.add(newRoute)
  }

  /**
   * @param {route | route[]} newRoutes
   * @return {RouteManager}
   */
  addRoutes(newRoutes) {
    return this.add(newRoutes)
  }

  /**
   * @param {route[]|route} routes
   * @return {RouteManager}
   */
  only(routes) {
    if (!Array.isArray(routes)) {
      routes = [routes]
    }
    // @ts-ignore
    this.routes = this.routes.filter(i => routes.includes(i) || routes.includes(i.name))
    return this
  }

  /**
   * @param {route[]|route} routes
   * @return {RouteManager}
   */
  except(routes) {
    if (!Array.isArray(routes)) {
      routes = [routes]
    }
    // @ts-ignore
    this.routes = this.routes.filter(i => !routes.includes(i) && !routes.includes(i.name))

    return this
  }

  /**
   * @returns {routes}
   */
  get() {
    return this.routes
  }
}

module.exports = RouteManager
