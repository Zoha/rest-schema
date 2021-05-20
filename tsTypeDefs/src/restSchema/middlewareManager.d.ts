export = MiddlewareManager;
/**
 * @typedef {import("../../typeDefs/schema").middleware} middleware
 */
/**
 * @typedef {import("../../typeDefs/route").routes} routes
 * @typedef {import("../../typeDefs/route").route} route
 */
declare class MiddlewareManager {
    /**
     *
     * @param {routes | RouteManager} extraRoutes
     */
    constructor(extraRoutes?: routes | RouteManager);
    defaultRoutes: any[];
    middlewareList: {};
    /**
     * @private
     */
    private setDefaultMiddlewareList;
    /**
     *
     * @param {(Array<string>| string)} route
     * @param {middleware | middleware[]} middleware
     * @return {MiddlewareManager}
     */
    addToRoute(route: (Array<string> | string), middleware: middleware | middleware[]): MiddlewareManager;
    /**
     * @param {middleware | middleware[]} middleware
     * @return {MiddlewareManager}
     */
    addToGlobal(middleware: middleware | middleware[]): MiddlewareManager;
    /**
     * @param {middleware | middleware[]} middleware
     * @param {string | Array<string>} exceptRoutes
     * @return {MiddlewareManager}
     */
    add(middleware: middleware | middleware[], exceptRoutes?: string | Array<string>): MiddlewareManager;
    /**
     * @param {string | Array<string>} exceptRoutes
     * @param {middleware | middleware[]} middleware
     * @return {MiddlewareManager}
     */
    addToAllRoutesExcept(exceptRoutes: string | Array<string>, middleware: middleware | middleware[]): MiddlewareManager;
    /**
     * @param {string | Array<string>} targetRoutes
     * @param {middleware | middleware[]} middleware
     * @return {MiddlewareManager}
     */
    addToThisRoutes(targetRoutes: string | Array<string>, middleware: middleware | middleware[]): MiddlewareManager;
    /**
     * @returns {middleware}
     */
    get(): middleware;
}
declare namespace MiddlewareManager {
    export { middleware, routes, route };
}
type middleware = import("../../typeDefs/schema").middleware;
type routes = import("../../typeDefs/route").routes;
import RouteManager = require("./routeManager");
type route = import("../../typeDefs/route").route;
