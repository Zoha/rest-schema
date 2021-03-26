/**
 * @typedef {import("../../typeDefs/route").routes} routes
 * @typedef {import("../../typeDefs/route").route} route
 */

class RouteManager {
  /**
   * @param {route[]} routes
   */
  constructor(routes) {
    this.routes = Object.values(routes)
  }

  /**
   * @param {route} newRoute
   * @return {RouteManager}
   */
  add(newRoute) {
    this.routes = [...this.routes, newRoute]
    return this
  }

  /**
   * @param {route} newRoute
   * @return {RouteManager}
   */
  addRoute(newRoute) {
    this.routes = [...this.routes, newRoute]
    return this
  }

  /**
   * @param {route[]} newRoutes
   * @return {RouteManager}
   */
  addRoutes(newRoutes) {
    this.routes = [...this.routes, ...newRoutes]
    return this
  }

  /**
   * @param {route[]} routes
   * @return {RouteManager}
   */
  only(routes) {
    // @ts-ignore
    this.routes = this.routes.filter(i => routes.includes(i) || routes.includes(i.name))
    return this
  }

  /**
   * @param {route[]} routes
   * @return {RouteManager}
   */
  except(routes) {
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
