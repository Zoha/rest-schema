export = RouteManager;
/**
 * @typedef {import("../../typeDefs/route").routes} routes
 * @typedef {import("../../typeDefs/route").route} route
 */
declare class RouteManager {
    /**
     * @param {route[]} [routes]
     */
    constructor(routes?: route[]);
    routes: any;
    /**
     * @param {route | route[]} newRoute
     * @return {RouteManager}
     */
    add(newRoute: route | route[]): RouteManager;
    /**
     * @param {route | route[]} newRoute
     * @return {RouteManager}
     */
    addRoute(newRoute: route | route[]): RouteManager;
    /**
     * @param {route | route[]} newRoutes
     * @return {RouteManager}
     */
    addRoutes(newRoutes: route | route[]): RouteManager;
    /**
     * @param {route[]|route} routes
     * @return {RouteManager}
     */
    only(routes: route[] | route): RouteManager;
    /**
     * @param {route[]|route} routes
     * @return {RouteManager}
     */
    except(routes: route[] | route): RouteManager;
    /**
     * @returns {route[]}
     */
    get(): route[];
}
declare namespace RouteManager {
    export { routes, route };
}
type route = import("../../typeDefs/route").route;
type routes = import("../../typeDefs/route").routes;
