import setDefaultField = require("./setDefaultField");
import setDefaultMessages = require("./setDefaultMessages");
export const setDefaultValidationMessages: (validationMessages: any, { target }?: {
    target?: {
        required: string;
        min: string;
        minLength: string;
        max: string;
        maxLength: string;
        between: string;
        betweenLength: string;
        enum: string;
        default: string;
        match: string;
        unique: string;
        auth: string;
        uniqueItems: string;
        requiredUpdate: string;
        existsIn: string;
    };
}) => void;
import setDefaultRoute = require("./setDefaultRoute");
export const setDefaultRouteMeta: (newDefaultRouteMeta: any, { target }?: {
    target?: import("../../../typeDefs/route").routeMeta;
}) => void;
export const setDefaultRouteFilteringOperators: (newDefaultRouteFilteringOperators: any, { target }?: {
    target?: import("../../../typeDefs/route").filteringOperators;
}) => void;
import setDefaultSchema = require("./setDefaultSchema");
export const setDefaultSchemaFields: (newDefaultSchemaFields: any, { target }?: {
    target?: import("../../../typeDefs/field").fields;
}) => void;
export const setDefaultSchemaPagination: (newDefaultSchemaPagination: any, { target }?: {
    target?: import("../../../typeDefs/schema").pagination;
}) => void;
export const setDefaultSchemaRoutes: (newDefaultSchemaRoutes: any, { target }?: {
    target?: import("../../../typeDefs/route").routes;
}) => void;
export const setDefaultSchemaWrappers: (newDefaultSchemaWrappers: any, { target }?: {
    target?: import("../../../typeDefs/schema").wrappers;
}) => void;
import addHook = require("./addHook");
import addMiddleware = require("./addMiddleware");
export { setDefaultField, setDefaultMessages, setDefaultRoute, setDefaultSchema, addHook, addMiddleware };
