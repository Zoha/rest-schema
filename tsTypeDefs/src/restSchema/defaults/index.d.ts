export = defaults;
/**
 * @typedef {import("../../../typeDefs/field").field} field
 */
/**
 * @typedef {import("./defaultMessages")} messages
 */
/**
 * @typedef {import("../../../typeDefs/route").route} route
 */
/**
 * @typedef {import("../../../typeDefs/schema").schema} schema
 */
/**
 * @typedef {import("../../../typeDefs/schema").hooks} hooks
 */
/**
 * @typedef {import("../../../typeDefs/schema").middleware} middleware
 */
/**
 * @typedef {object} defaults
 * @property {field} defaultField
 * @property {messages} defaultMessages
 * @property {route} defaultRoute
 * @property {schema} defaultSchema
 * @property {schema} defaultPluginMiddlewareList
 * @property {hooks} defaultPluginHooks
 */
/** @type {defaults} */
declare const defaults: defaults;
declare namespace defaults {
    export { field, messages, route, schema, hooks, middleware, defaults };
}
type field = import("../../../typeDefs/field").field;
type messages = {
    validations: {
        required: string;
        min: string;
        minLength: string;
        max: string;
        maxLength: string;
        between: string;
        betweenLength: string;
        enum: string;
        default: string;
        match: string; /**
         * @typedef {import("../../../typeDefs/schema").schema} schema
         */
        unique: string;
        auth: string;
        uniqueItems: string;
        requiredUpdate: string;
        existsIn: string;
    };
    idParamNotFound: string;
    resourceNotFound: string;
    validationPassed: string;
    inactiveRouteMessage: string;
    listOfErrors: string;
    maximumRelationDepth: string;
};
type route = import("../../../typeDefs/route").route;
type schema = import("../../../typeDefs/schema").schema;
type hooks = import("../../../typeDefs/schema").hooks;
type middleware = import("../../../typeDefs/schema").middleware;
type defaults = {
    defaultField: field;
    defaultMessages: messages;
    defaultRoute: route;
    defaultSchema: schema;
    defaultPluginMiddlewareList: schema;
    defaultPluginHooks: hooks;
};
