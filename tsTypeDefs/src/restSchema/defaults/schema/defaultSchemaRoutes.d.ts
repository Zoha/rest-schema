export = defaultSchemaRoutes;
/**
 * @typedef {import("../../../../typeDefs/route").route} route
 */
/** @type {Object<string , route>} */
declare const defaultSchemaRoutes: {
    [x: string]: route;
};
declare namespace defaultSchemaRoutes {
    export { route };
}
type route = import("../../../../typeDefs/route").route;
