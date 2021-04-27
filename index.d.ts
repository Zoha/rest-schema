declare module "src/restSchema/use" {
    function _exports(callback: userCallback): any;
    export = _exports;
    export type userCallback = () => any;
}
declare module "src/restSchema/CustomObjectId" {
    export = RestSchemaObjectId;
    function RestSchemaObjectId(val: any): mongoose.Types.ObjectId;
    namespace RestSchemaObjectId {
        const isValid: typeof import("bson").ObjectId.isValid;
        const createFromHexString: typeof import("bson").ObjectId.createFromHexString;
        const createFromTime: typeof import("bson").ObjectId.createFromTime;
        const generate: typeof import("bson").ObjectId.generate;
        const cacheHexString: boolean;
    }
    import mongoose = require("mongoose");
}
declare module "src/restSchema/types" {
    const _exports: {
        readonly String: StringConstructor;
        readonly Number: NumberConstructor;
        readonly Object: ObjectConstructor;
        readonly Array: ArrayConstructor;
        readonly Boolean: BooleanConstructor;
        readonly Buffer: typeof Buffer;
        readonly Date: DateConstructor;
        readonly Map: MapConstructor;
        readonly Mixed: any;
        readonly ObjectId: {
            (val: any): import("mongoose").Types.ObjectId;
            isValid: typeof import("bson").ObjectId.isValid;
            createFromHexString: typeof import("bson").ObjectId.createFromHexString;
            createFromTime: typeof import("bson").ObjectId.createFromTime;
            generate: typeof import("bson").ObjectId.generate;
            cacheHexString: boolean;
            prototype: any;
        };
    };
    export = _exports;
}
declare module "src/restSchema/enums/relationTypes" {
    export const collection: string;
    export const resource: string;
}
declare module "src/restSchema/defaults/defaultField" {
    import { Mixed } from "src/restSchema/types";
    export const type: string;
    export const key: string;
    export const nestedKey: string;
    export const uniqueKey: string;
    export const isNested: boolean;
    export const isArrayNested: boolean;
    export const isObjectNested: boolean;
    export const children: {};
    export const creatable: boolean;
    export const updatable: boolean;
    export const filterable: boolean;
    export const sortable: boolean;
    export const hide: boolean;
    export const hideByDefault: boolean;
    export const set: any;
    export const get: any;
    export const sanitize: any;
    export const trim: boolean;
    export const lowercase: boolean;
    export const uppercase: boolean;
    const _default: any;
    export const pickUniqueItems: boolean;
    export const ref: any;
    export const refPath: any;
    export function find(resource: any, ctx: any, relationCtx: any, relation: any): {
        $or: ({
            [x: number]: any;
            _id?: undefined;
        } | {
            _id: any;
        })[];
    };
    export const validate: any;
    export const unique: boolean;
    export const required: boolean;
    export const min: any;
    export const max: any;
    export const between: any;
    export const minLength: any;
    export const maxLength: any;
    export const betweenLength: any;
    export const match: any;
    const _enum: any;
    export const existsIn: any;
    export { Mixed as of, _default as default, _enum as enum };
}
declare module "src/restSchema/defaults/defaultMessages" {
    export namespace validations {
        export const required: string;
        export const min: string;
        export const minLength: string;
        export const max: string;
        export const maxLength: string;
        export const between: string;
        export const betweenLength: string;
        const _enum: string;
        export { _enum as enum };
        const _default: string;
        export { _default as default };
        export const match: string;
        export const unique: string;
        export const auth: string;
        export const uniqueItems: string;
        export const requiredUpdate: string;
        export const existsIn: string;
    }
    export const idParamNotFound: string;
    export const resourceNotFound: string;
    export const validationPassed: string;
    export const inactiveRouteMessage: string;
    export const listOfErrors: string;
}
declare module "src/restSchema/cast/array" {
    function _exports(val: any): any[];
    export = _exports;
}
declare module "src/restSchema/cast/boolean" {
    function _exports(value: any): boolean;
    export = _exports;
}
declare module "src/restSchema/cast/date" {
    function _exports(value: any): Date;
    export = _exports;
}
declare module "src/restSchema/cast/number" {
    function _exports(value: any): number;
    export = _exports;
}
declare module "src/restSchema/cast/object" {
    function _exports(val: any): object;
    export = _exports;
}
declare module "src/restSchema/cast/objectId" {
    function _exports(value: any): ObjectId;
    export = _exports;
    import { ObjectId } from "mongodb";
}
declare module "src/restSchema/cast/string" {
    function _exports(value: any): string;
    export = _exports;
}
declare module "src/restSchema/customType" {
    export = CustomType;
    class CustomType {
        cast(value: any): any;
        getFieldOptions(): {};
    }
}
declare module "src/restSchema/helpers/cast" {
    function _exports(value: any, type?: any): RSConvertTo;
    export = _exports;
    export type RSToCallback = (to: any) => any;
    export type RSConvertTo = {
        to: RSToCallback;
    };
}
declare module "src/restSchema/defaults/defaultRoute" {
    export const name: string;
    export const method: string;
    export const path: string;
    export const inputsTarget: string[];
    export const selectable: boolean;
    export const filterable: boolean;
    export const middleware: any[];
    export namespace meta {
        const select: string;
        const sort: string;
        const limit: string;
        const skip: string;
        const page: string;
    }
    export function handler(context: any): Promise<{
        message: any;
    }>;
    export namespace filteringOperators {
        function $eq(v: any, k: any, type: any): {
            $eq: any;
        };
        function $gt(v: any, k: any, type: any): {
            $gt: any;
        };
        function $gte(v: any, k: any, type: any): {
            $gte: any;
        };
        function $in(v: any, k: any, type: any): {
            $in: any;
        };
        function $lt(v: any, k: any, type: any): {
            $lt: any;
        };
        function $lte(v: any, k: any, type: any): {
            $lte: any;
        };
        function $ne(v: any, k: any, type: any): {
            $ne: any;
        };
        function $nin(v: any, k: any, type: any): {
            $nin: any;
        };
        function $exists(): {
            $exists: boolean;
        };
        function $notExists(): {
            $exists: boolean;
        };
        function $null(): any;
        function $notNull(): {
            $ne: any;
        };
        function $regex(v: any): {
            $regex: RegExp;
        };
        function $regexi(v: any): {
            $regex: RegExp;
        };
    }
}
declare module "src/restSchema/defaults/schema/defaultSchemaFields" {
    import { ObjectId } from "src/restSchema/types";
    export namespace _id {
        export { ObjectId as type };
        export const creatable: boolean;
        export const updatable: boolean;
    }
    export namespace createdAt {
        export const type: DateConstructor;
        const creatable_1: boolean;
        export { creatable_1 as creatable };
        const updatable_1: boolean;
        export { updatable_1 as updatable };
    }
    export namespace updatedAt {
        const type_1: DateConstructor;
        export { type_1 as type };
        const creatable_2: boolean;
        export { creatable_2 as creatable };
        const updatable_2: boolean;
        export { updatable_2 as updatable };
    }
}
declare module "src/restSchema/helpers/getRelationPaths" {
    function _exports(path: any): {
        fieldName: string;
        path: string;
    };
    export = _exports;
}
declare module "src/restSchema/helpers/manualInvolveMiddlewareList" {
    function _exports(req: any, res: any, middlewareList: any): Promise<boolean>;
    export = _exports;
}
declare module "src/restSchema/helpers/isArray" {
    function _exports(a: any): boolean;
    export = _exports;
}
declare module "src/restSchema/helpers/isFunction" {
    function _exports(a: any): boolean;
    export = _exports;
}
declare module "src/restSchema/helpers/isObject" {
    function _exports(a: any): boolean;
    export = _exports;
}
declare module "src/restSchema/middleware/registerMiddlewareList" {
    function _exports(schema: any, routeObject: any): any[];
    export = _exports;
}
declare module "src/restSchema/set/setDefaultField" {
    function _exports(newField: any, { target }?: {
        target?: import("typeDefs/field").field;
    }): void;
    export = _exports;
}
declare module "src/restSchema/set/setDefaultMessages" {
    function _exports(newMessages: any, { target }?: {
        target?: {
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
                match: string;
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
        };
    }): void;
    namespace _exports {
        function setDefaultValidationMessages(validationMessages: any, { target }?: {
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
        }): void;
    }
    export = _exports;
}
declare module "src/restSchema/set/setDefaultRoute" {
    function _exports(newDefaultRouteData: any, { target, mergeFilteringOperators }?: {
        target?: import("typeDefs/route").route;
        mergeFilteringOperators?: boolean;
    }): void;
    namespace _exports {
        function setDefaultRouteMeta(newDefaultRouteMeta: any, { target }?: {
            target?: import("typeDefs/route").routeMeta;
        }): void;
        function setDefaultRouteFilteringOperators(newDefaultRouteFilteringOperators: any, { target }?: {
            target?: import("typeDefs/route").filteringOperators;
        }): void;
    }
    export = _exports;
}
declare module "src/restSchema/set/setDefaultSchema" {
    function _exports(newDefaultSchema: any, { target, mergeFields, mergeRoutes }?: {
        target?: import("typeDefs/schema").schema;
        mergeFields?: boolean;
        mergeRoutes?: boolean;
    }): void;
    namespace _exports {
        function setDefaultSchemaFields(newDefaultSchemaFields: any, { target }?: {
            target?: import("typeDefs/field").fields;
        }): void;
        function setDefaultSchemaRoutes(newDefaultSchemaRoutes: any, { target }?: {
            target?: import("typeDefs/route").routes;
        }): void;
        function setDefaultSchemaPagination(newDefaultSchemaPagination: any, { target }?: {
            target?: import("typeDefs/schema").pagination;
        }): void;
        function setDefaultSchemaWrappers(newDefaultSchemaWrappers: any, { target }?: {
            target?: import("typeDefs/schema").wrappers;
        }): void;
    }
    export = _exports;
}
declare module "src/restSchema/set/addHook" {
    function _exports(route: any, hookName: any, hook: any, { target }?: {
        target?: import("typeDefs/schema").hooks;
    }): void;
    export = _exports;
}
declare module "src/restSchema/set/addMiddleware" {
    function _exports(route: any, middleware: any, { target }?: {
        target?: import("typeDefs/schema").schema;
    }): void;
    export = _exports;
}
declare module "src/restSchema/set/index" {
    import setDefaultField = require("src/restSchema/set/setDefaultField");
    import setDefaultMessages = require("src/restSchema/set/setDefaultMessages");
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
    import setDefaultRoute = require("src/restSchema/set/setDefaultRoute");
    export const setDefaultRouteMeta: (newDefaultRouteMeta: any, { target }?: {
        target?: import("typeDefs/route").routeMeta;
    }) => void;
    export const setDefaultRouteFilteringOperators: (newDefaultRouteFilteringOperators: any, { target }?: {
        target?: import("typeDefs/route").filteringOperators;
    }) => void;
    import setDefaultSchema = require("src/restSchema/set/setDefaultSchema");
    export const setDefaultSchemaFields: (newDefaultSchemaFields: any, { target }?: {
        target?: import("typeDefs/field").fields;
    }) => void;
    export const setDefaultSchemaPagination: (newDefaultSchemaPagination: any, { target }?: {
        target?: import("typeDefs/schema").pagination;
    }) => void;
    export const setDefaultSchemaRoutes: (newDefaultSchemaRoutes: any, { target }?: {
        target?: import("typeDefs/route").routes;
    }) => void;
    export const setDefaultSchemaWrappers: (newDefaultSchemaWrappers: any, { target }?: {
        target?: import("typeDefs/schema").wrappers;
    }) => void;
    import addHook = require("src/restSchema/set/addHook");
    import addMiddleware = require("src/restSchema/set/addMiddleware");
    export { setDefaultField, setDefaultMessages, setDefaultRoute, setDefaultSchema, addHook, addMiddleware };
}
declare module "src/restSchema/contextMethods/cast" {
    export = cast;
    import cast = require("src/restSchema/helpers/cast");
}
declare module "src/restSchema/contextMethods/createResource" {
    function _exports({ setResource, setCreatedResource, inputs }?: {
        setResource?: boolean;
        setCreatedResource?: boolean;
        inputs?: object;
    }): Promise<resource>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
}
declare module "src/restSchema/helpers/filter" {
    function _exports(items: any, fn: any): any;
    export = _exports;
}
declare module "src/restSchema/helpers/deepMergeFilters" {
    function _exports(filters: any): {};
    export = _exports;
}
declare module "src/restSchema/contextMethods/deleteResource" {
    function _exports({ setDeletedResource, resource, filters }?: {
        setDeletedResource?: boolean;
        resource?: resource;
        filters?: boolean;
    }): Promise<resource>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
}
declare module "src/restSchema/helpers/get" {
    const _exports: any;
    export = _exports;
}
declare module "src/restSchema/contextMethods/findLocationOfInput" {
    function _exports({ key, req, inputsTargets }: {
        key: string;
        req?: string;
        inputsTargets?: string;
    }): Promise<resource>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
}
declare module "src/restSchema/contextMethods/getCollection" {
    function _exports({ setCollection, force, filters, skip, limit, sort, filtersMeta }?: {
        setCollection?: boolean;
        force?: boolean;
        filters?: object;
        skip?: number;
        limit?: number;
        sort?: object;
        filtersMeta?: object;
    }): Promise<Array<resource>>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
}
declare module "src/restSchema/helpers/isBoolean" {
    function _exports(value: any): boolean;
    export = _exports;
}
declare module "src/restSchema/contextMethods/getCreateFields" {
    function _exports({ fields }?: {
        fields?: fields;
    }): Promise<fields>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getCreateInputs" {
    function _exports({ setCreateInputs, fields, inputs }?: {
        setCreateInputs?: boolean;
        fields?: fields;
        inputs?: object;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/schemaFormatters/routeFormatter" {
    export function getRoute(route: any, customDefaults: any): any;
    export function getRoutes(routes: any, defaults: any): any[];
}
declare module "typeDefs/route" {
    export type fieldType = import("typeDefs/field").fieldType;
    export type context = import("typeDefs/context").context;
    export type routeMeta = {
        select?: string;
        sort?: string;
        limit?: string;
        skip?: string;
        page?: string;
    };
    export type routeHandlerCallback = (ctx: context) => any;
    export type filteringOperatorCallback = (value: string, key: string, type: fieldType) => {
        [x: string]: any;
    };
    export type filteringOperatorsDefaults = {
        /**
         * :
         */
        $eq: filteringOperatorCallback;
        /**
         * :
         */
        $gt: filteringOperatorCallback;
        /**
         * :
         */
        $gte: filteringOperatorCallback;
        /**
         * :
         */
        $in: filteringOperatorCallback;
        /**
         * :
         */
        $lt: filteringOperatorCallback;
        /**
         * :
         */
        $lte: filteringOperatorCallback;
        /**
         * :
         */
        $ne: filteringOperatorCallback;
        /**
         * :
         */
        $nin: filteringOperatorCallback;
        $exists: filteringOperatorCallback;
        $notExists: filteringOperatorCallback;
        $null: filteringOperatorCallback;
        $notNull: filteringOperatorCallback;
        /**
         * :
         */
        $regex: filteringOperatorCallback;
        /**
         * :
         */
        $regexi: filteringOperatorCallback;
    };
    export type filteringOperators = (filteringOperatorsDefaults | {
        [x: string]: filteringOperatorCallback;
    });
    export type requestHandler = import("node_modules/@types/express/index").RequestHandler;
    export type routeProps = {
        handler: (routeHandlerCallback | Promise<routeHandlerCallback>);
        middleware?: requestHandler[] | requestHandler;
        name?: ('create' | 'update' | 'delete' | 'index' | 'single' | 'validate' | 'count' | string);
        method?: ('get' | 'post' | 'delete' | 'put' | 'patch' | string);
        path?: string;
        inputsTarget?: Array<('query' | 'body' | 'header' | string)>;
        selectable?: boolean;
        filterable?: boolean;
        meta?: routeMeta;
        filteringOperators?: filteringOperators;
    };
    export type route = routeProps & {
        [x: string]: any;
    };
    export type routes = Array<'create' | 'update' | 'delete' | 'count' | 'single' | 'validate' | 'index' | route> | {
        [x: string]: route;
    };
}
declare module "src/restSchema/contextMethods/getCustomFilters" {
    function _exports({ filters, route, routes, relationFilters }?: {
        filters?: object;
        route?: string;
        routes?: routes;
        relationFilters?: object;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type route = import("typeDefs/route").route;
    export type routes = route[];
}
declare module "src/restSchema/contextMethods/getFields" {
    function _exports({ setFields, fields }?: {
        setFields?: boolean;
        fields?: fields;
    }): Promise<fields>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getFilters" {
    function _exports({ inputs, operators, defaultRouteFilters, customFilters, filteringMeta }?: {
        inputs?: object;
        operators?: import("typeDefs/route").filteringOperators;
        defaultRouteFilters?: object;
        customFilters?: object;
        filteringMeta?: object;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getInputs" {
    function _exports({ setInputs, req, inputsTarget, force }?: {
        setInputs?: boolean;
        req?: request;
        inputsTarget?: string[];
        force?: boolean;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
    export type request = import("typeDefs/context").request;
}
declare module "src/restSchema/helpers/addToFieldsArrayAsLengthOfInputs" {
    function _exports(argFields: any, argInputs: any): any;
    export = _exports;
}
declare module "src/restSchema/helpers/createMapFieldsFromInput" {
    function _exports(eachInputItemField: any, argInputs: any): {};
    export = _exports;
}
declare module "src/restSchema/contextMethods/getInputsFromFields" {
    function _exports({ fields, inputs }?: {
        fields?: fields;
        inputs?: object;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getLimit" {
    function _exports({ defaultLimit, maxLimit, minLimit, limitKey, inputs }?: {
        defaultLimit?: number;
        maxLimit?: number;
        minLimit?: number;
        limitKey?: string;
        inputs?: object;
    }): Promise<number>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getMessages" {
    function _exports(): messages;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type messages = {
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
            match: string;
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
    };
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getNestedField" {
    function _exports({ key, fields }: {
        key: string;
        fields?: fields;
    }): Promise<field>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
    export type fieldType = import("typeDefs/field").fieldType;
    export type field = import("typeDefs/field").field;
}
declare module "src/restSchema/contextMethods/getNestedInput" {
    function _exports({ key, inputs }: {
        key: string;
        inputs?: object;
    }): Promise<any>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getPage" {
    function _exports({ skip, limit }?: {
        skip?: number;
        limit?: number;
    }): Promise<number>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/getSchemaModel" {
    export function getSchemaModel(name: any): any;
    export const definedSchemaList: {};
}
declare module "src/restSchema/contextMethods/getRelations" {
    function _exports({ fields }?: {
        fields?: fields;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getResource" {
    function _exports({ errorOnNotFound, setResource, force, resourceId, model, filters }?: {
        errorOnNotFound?: boolean;
        setResource?: boolean;
        force?: boolean;
        resourceId?: any;
        model?: model;
        filters?: object;
    }): Promise<resource>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
    export type model = import("typeDefs/context").model;
}
declare module "src/restSchema/helpers/setOnContext" {
    function _exports(context: any, key: any, value: any): void;
    export = _exports;
}
declare module "src/restSchema/contextMethods/getResourceResponse" {
    function _exports({ resource }?: {
        resource?: resource;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
    export type model = import("typeDefs/context").model;
}
declare module "src/restSchema/contextMethods/getResponseValuesFromResource" {
    function _exports({ fields, resource, selectFields }?: {
        fields?: fields;
        resource?: resource;
        selectFields?: fields;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getRouteKeys" {
    function _exports(): string[];
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getRouteKeysFilters" {
    function _exports({ routeKeys, req, id, idKey, idTarget, fallbackFilters }?: {
        routeKeys?: string[];
        req?: request;
        id?: any;
        idKey?: string;
        idTarget?: string;
        fallbackFilters?: object;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
    export type request = import("typeDefs/context").request;
}
declare module "src/restSchema/contextMethods/getRoutes" {
    function _exports(): routes;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type routes = import("typeDefs/route").routes;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getSelectFields" {
    function _exports({ resource, fields, selectInputKey, inputs, routeObject, selectable }?: {
        resource?: resource;
        fields?: fields;
        selectInputKey?: string;
        inputs?: object;
        routeObject?: import("typeDefs/route").route;
        selectable?: boolean;
    }): Promise<fields>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
    export type field = import("typeDefs/field").field;
    export type selectFieldBase = {
        showChildrenByDefault: boolean;
        show: boolean;
        children: selectFieldBase[];
        key: string;
    };
}
declare module "src/restSchema/contextMethods/getSkip" {
    function _exports({ skip, inputs, skipInputKey, page, pageInputKey, defaultPage, limit }?: {
        skip?: number;
        inputs?: object;
        skipInputKey?: string;
        page?: number;
        pageInputKey?: string;
        defaultPage?: number;
        limit?: number;
    }): Promise<number>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getSort" {
    function _exports({ inputs, sortKey, defaultSort, sortString }?: {
        sortKey?: string;
        inputs?: object;
        defaultSort?: object;
        sortString?: string;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getTotal" {
    function _exports({ setTotal, filters }?: {
        setTotal?: boolean;
        filters?: object;
    }): Promise<number>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getUpdateFields" {
    function _exports({ fields }?: {
        fields?: fields;
    }): Promise<fields>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getUpdateInputs" {
    function _exports({ setUpdateInputs, updateFields }?: {
        setUpdateInputs?: boolean;
        updateFields?: fields;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/hook" {
    function _exports(hook: string): Promise<any>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
    export type hooks = import("typeDefs/schema").hooks;
}
declare module "src/restSchema/sanitizers/lowercase" {
    function _exports(value: any): any;
    export = _exports;
}
declare module "src/restSchema/helpers/unique" {
    function _exports(items: any, key: any, context: any): Promise<any>;
    export = _exports;
}
declare module "src/restSchema/sanitizers/pickUniqueItems" {
    function _exports(value: any, callback: any, field: any, context: any): Promise<any>;
    export = _exports;
}
declare module "src/restSchema/sanitizers/slice" {
    function _exports(value: any, [start, end]: [any, any]): any;
    export = _exports;
}
declare module "src/restSchema/sanitizers/trim" {
    function _exports(value: any): any;
    export = _exports;
}
declare module "src/restSchema/sanitizers/uppercase" {
    function _exports(value: any): any;
    export = _exports;
}
declare module "src/restSchema/sanitizers/index" {
    import lowercase = require("src/restSchema/sanitizers/lowercase");
    import pickUniqueItems = require("src/restSchema/sanitizers/pickUniqueItems");
    import slice = require("src/restSchema/sanitizers/slice");
    import trim = require("src/restSchema/sanitizers/trim");
    import uppercase = require("src/restSchema/sanitizers/uppercase");
    export { lowercase, pickUniqueItems, slice, trim, uppercase };
}
declare module "src/restSchema/contextMethods/sanitizeInput" {
    function _exports({ value, field }: {
        value: any;
        field: field;
    }): Promise<any>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
    export type field = import("typeDefs/field").field;
}
declare module "src/restSchema/contextMethods/sanitizeInputs" {
    function _exports({ setInputs, fields, inputs, setDirtyInputs }?: {
        setInputs?: boolean;
        fields?: fields;
        inputs?: object;
        setDirtyInputs?: boolean;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/setPaginationHeaders" {
    function _exports({ res, total, collection, count, skip, limit, page, start, end, range, hasPrevPage, hasNextPage, prevPage, nextPage, lastPage }?: {
        res?: import("typeDefs/context").response;
        total?: number;
        collection?: Array<resource>;
        count?: number;
        skip?: number;
        limit?: number;
        page?: number;
        start?: number;
        end?: number;
        range?: number;
        hasPrevPage?: boolean;
        hasNextPage?: boolean;
        prevPage?: number | string;
        nextPage?: number | string;
        lastPage?: number;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/updateResource" {
    function _exports({ setResource, setUpdatedResource, resource, filters }?: {
        setResource?: boolean;
        setUpdatedResource?: boolean;
        resource?: resource;
        filters?: object;
    }): Promise<resource>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/validators/auth" {
    function _exports(value: any, callback: any, field: any, context: any): Promise<boolean>;
    export = _exports;
}
declare module "src/restSchema/validators/min" {
    function _exports(value: any, of: any, field: any, context: any, checkString?: boolean): boolean;
    export = _exports;
}
declare module "src/restSchema/validators/max" {
    function _exports(value: any, of: any, field: any, context: any, checkString?: boolean): boolean;
    export = _exports;
}
declare module "src/restSchema/validators/between" {
    function _exports(value: any, [min, max]: [any, any], field: any, context: any, checkString?: boolean): boolean;
    export = _exports;
}
declare module "src/restSchema/validators/betweenLength" {
    function _exports(...args: any[]): boolean;
    export = _exports;
}
declare module "src/restSchema/validators/enum" {
    function _exports(value: any, validItems: any): boolean;
    export = _exports;
}
declare module "src/restSchema/validators/existsIn" {
    function _exports(value: any, modelName: any): Promise<boolean>;
    export = _exports;
}
declare module "src/restSchema/validators/match" {
    function _exports(value: any, match: any): boolean;
    export = _exports;
}
declare module "src/restSchema/validators/maxLength" {
    function _exports(...args: any[]): boolean;
    export = _exports;
}
declare module "src/restSchema/validators/minLength" {
    function _exports(...args: any[]): boolean;
    export = _exports;
}
declare module "src/restSchema/validators/required" {
    function _exports(value: any): boolean;
    export = _exports;
}
declare module "src/restSchema/validators/unique" {
    function _exports(value: any, args: any, field: any, context: any): Promise<boolean>;
    export = _exports;
}
declare module "src/restSchema/validators/uniqueItems" {
    function _exports(value: any, callback: any, field: any, context: any): Promise<boolean>;
    export = _exports;
}
declare module "src/restSchema/validators/requiredUpdate" {
    function _exports(value: any): boolean;
    export = _exports;
}
declare module "src/restSchema/validators/index" {
    import auth = require("src/restSchema/validators/auth");
    import between = require("src/restSchema/validators/between");
    import betweenLength = require("src/restSchema/validators/betweenLength");
    import checkEnum = require("src/restSchema/validators/enum");
    import existsIn = require("src/restSchema/validators/existsIn");
    import match = require("src/restSchema/validators/match");
    import max = require("src/restSchema/validators/max");
    import maxLength = require("src/restSchema/validators/maxLength");
    import min = require("src/restSchema/validators/min");
    import minLength = require("src/restSchema/validators/minLength");
    import required = require("src/restSchema/validators/required");
    import requiredUpdate = require("src/restSchema/validators/requiredUpdate");
    import unique = require("src/restSchema/validators/unique");
    import uniqueItems = require("src/restSchema/validators/uniqueItems");
    export { auth, between, betweenLength, checkEnum as enum, existsIn, match, max, maxLength, min, minLength, required, requiredUpdate, unique, uniqueItems };
}
declare module "src/restSchema/contextMethods/validateInput" {
    function _exports({ value, field, key }: {
        value?: any;
        field: field;
        key?: string;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
    export type field = import("typeDefs/field").field;
}
declare module "src/restSchema/contextMethods/validateInputs" {
    function _exports({ setValidationErrors, fields, inputs, checkRequired }?: {
        setValidationErrors?: boolean;
        fields?: fields;
        inputs?: object;
        checkRequired?: boolean;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/contextMethods/getCollectionResponse" {
    function _exports({ collection, fields }?: {
        collection?: Array<resource>;
        fields?: fields;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type fields = import("typeDefs/field").fields;
    export type context = import("typeDefs/context").context;
}
declare module "src/restSchema/contextMethods/getDirtyInputs" {
    function _exports({ setDirtyInputs, force, inputs, resource }?: {
        setDirtyInputs?: boolean;
        inputs?: object;
        resource?: resource;
        force?: boolean;
    }): Promise<object>;
    export = _exports;
    export type resource = import("typeDefs/context").resource;
    export type context = import("typeDefs/context").context;
    export type fields = import("typeDefs/field").fields;
}
declare module "src/restSchema/createContext" {
    function _exports(schema: import("typeDefs/schema").schema, route: import("typeDefs/route").route): import("typeDefs/context").context;
    namespace _exports {
        export { methods as contextMethods };
    }
    export = _exports;
    namespace methods {
        function cast(value: any, type?: any): import("src/restSchema/helpers/cast").RSConvertTo;
        function createResource({ setResource, setCreatedResource, inputs }?: {
            setResource?: boolean;
            setCreatedResource?: boolean;
            inputs?: any;
        }): Promise<import("typeDefs/context").resource>;
        function deleteResource({ setDeletedResource, resource, filters }?: {
            setDeletedResource?: boolean;
            resource?: import("typeDefs/context").resource;
            filters?: boolean;
        }): Promise<import("typeDefs/context").resource>;
        function findLocationOfInput({ key, req, inputsTargets }: {
            key: string;
            req?: string;
            inputsTargets?: string;
        }): Promise<import("typeDefs/context").resource>;
        function getCollection({ setCollection, force, filters, skip, limit, sort, filtersMeta }?: {
            setCollection?: boolean;
            force?: boolean;
            filters?: any;
            skip?: number;
            limit?: number;
            sort?: any;
            filtersMeta?: any;
        }): Promise<import("typeDefs/context").resource[]>;
        function getCreateFields({ fields }?: {
            fields?: import("typeDefs/field").fields;
        }): Promise<import("typeDefs/field").fields>;
        function getCreateInputs({ setCreateInputs, fields, inputs }?: {
            setCreateInputs?: boolean;
            fields?: import("typeDefs/field").fields;
            inputs?: any;
        }): Promise<any>;
        function getCustomFilters({ filters, route, routes, relationFilters }?: {
            filters?: any;
            route?: string;
            routes?: import("src/restSchema/contextMethods/getCustomFilters").routes;
            relationFilters?: any;
        }): Promise<any>;
        function getFields({ setFields, fields }?: {
            setFields?: boolean;
            fields?: import("typeDefs/field").fields;
        }): Promise<import("typeDefs/field").fields>;
        function getFilters({ inputs, operators, defaultRouteFilters, customFilters, filteringMeta }?: {
            inputs?: any;
            operators?: import("typeDefs/route").filteringOperators;
            defaultRouteFilters?: any;
            customFilters?: any;
            filteringMeta?: any;
        }): Promise<any>;
        function getInputs({ setInputs, req, inputsTarget, force }?: {
            setInputs?: boolean;
            req?: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            inputsTarget?: string[];
            force?: boolean;
        }): Promise<any>;
        function getInputsFromFields({ fields, inputs }?: {
            fields?: import("typeDefs/field").fields;
            inputs?: any;
        }): Promise<any>;
        function getLimit({ defaultLimit, maxLimit, minLimit, limitKey, inputs }?: {
            defaultLimit?: number;
            maxLimit?: number;
            minLimit?: number;
            limitKey?: string;
            inputs?: any;
        }): Promise<number>;
        function getMessages(): {
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
                match: string;
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
        };
        function getNestedField({ key, fields }: {
            key: string;
            fields?: import("typeDefs/field").fields;
        }): Promise<import("typeDefs/field").field>;
        function getNestedInput({ key, inputs }: {
            key: string;
            inputs?: any;
        }): Promise<any>;
        function getPage({ skip, limit }?: {
            skip?: number;
            limit?: number;
        }): Promise<number>;
        function getRelations({ fields }?: {
            fields?: import("typeDefs/field").fields;
        }): Promise<any>;
        function getResource({ errorOnNotFound, setResource, force, resourceId, model, filters }?: {
            errorOnNotFound?: boolean;
            setResource?: boolean;
            force?: boolean;
            resourceId?: any;
            model?: import("typeDefs/context").model;
            filters?: any;
        }): Promise<import("typeDefs/context").resource>;
        function getResourceResponse({ resource }?: {
            resource?: import("typeDefs/context").resource;
        }): Promise<any>;
        function getResponseValuesFromResource({ fields, resource, selectFields }?: {
            fields?: import("typeDefs/field").fields;
            resource?: import("typeDefs/context").resource;
            selectFields?: import("typeDefs/field").fields;
        }): Promise<any>;
        function getRouteKeys(): string[];
        function getRouteKeysFilters({ routeKeys, req, id, idKey, idTarget, fallbackFilters }?: {
            routeKeys?: string[];
            req?: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            id?: any;
            idKey?: string;
            idTarget?: string;
            fallbackFilters?: any;
        }): Promise<any>;
        function getRoutes(): import("typeDefs/route").routes;
        function getSelectFields({ resource, fields, selectInputKey, inputs, routeObject, selectable }?: {
            resource?: import("typeDefs/context").resource;
            fields?: import("typeDefs/field").fields;
            selectInputKey?: string;
            inputs?: any;
            routeObject?: import("typeDefs/route").route;
            selectable?: boolean;
        }): Promise<import("typeDefs/field").fields>;
        function getSkip({ skip, inputs, skipInputKey, page, pageInputKey, defaultPage, limit }?: {
            skip?: number;
            inputs?: any;
            skipInputKey?: string;
            page?: number;
            pageInputKey?: string;
            defaultPage?: number;
            limit?: number;
        }): Promise<number>;
        function getSort({ inputs, sortKey, defaultSort, sortString }?: {
            sortKey?: string;
            inputs?: any;
            defaultSort?: any;
            sortString?: string;
        }): Promise<any>;
        function getTotal({ setTotal, filters }?: {
            setTotal?: boolean;
            filters?: any;
        }): Promise<number>;
        function getUpdateFields({ fields }?: {
            fields?: import("typeDefs/field").fields;
        }): Promise<import("typeDefs/field").fields>;
        function getUpdateInputs({ setUpdateInputs, updateFields }?: {
            setUpdateInputs?: boolean;
            updateFields?: import("typeDefs/field").fields;
        }): Promise<any>;
        function hook(hook: string): Promise<any>;
        function sanitizeInput({ value, field }: {
            value: any;
            field: import("typeDefs/field").field;
        }): Promise<any>;
        function sanitizeInputs({ setInputs, fields, inputs, setDirtyInputs }?: {
            setInputs?: boolean;
            fields?: import("typeDefs/field").fields;
            inputs?: any;
            setDirtyInputs?: boolean;
        }): Promise<any>;
        function setPaginationHeaders({ res, total, collection, count, skip, limit, page, start, end, range, hasPrevPage, hasNextPage, prevPage, nextPage, lastPage }?: {
            res?: import("express").Response<any, Record<string, any>>;
            total?: number;
            collection?: import("typeDefs/context").resource[];
            count?: number;
            skip?: number;
            limit?: number;
            page?: number;
            start?: number;
            end?: number;
            range?: number;
            hasPrevPage?: boolean;
            hasNextPage?: boolean;
            prevPage?: string | number;
            nextPage?: string | number;
            lastPage?: number;
        }): Promise<any>;
        function updateResource({ setResource, setUpdatedResource, resource, filters }?: {
            setResource?: boolean;
            setUpdatedResource?: boolean;
            resource?: import("typeDefs/context").resource;
            filters?: any;
        }): Promise<import("typeDefs/context").resource>;
        function validateInput({ value, field, key }: {
            value?: any;
            field: import("typeDefs/field").field;
            key?: string;
        }): Promise<any>;
        function validateInputs({ setValidationErrors, fields, inputs, checkRequired }?: {
            setValidationErrors?: boolean;
            fields?: import("typeDefs/field").fields;
            inputs?: any;
            checkRequired?: boolean;
        }): Promise<any>;
        function getCollectionResponse({ collection, fields }?: {
            collection?: import("typeDefs/context").resource[];
            fields?: import("typeDefs/field").fields;
        }): Promise<any>;
        function getDirtyInputs({ setDirtyInputs, force, inputs, resource }?: {
            setDirtyInputs?: boolean;
            inputs?: any;
            resource?: import("typeDefs/context").resource;
            force?: boolean;
        }): Promise<any>;
    }
}
declare module "src/restSchema/middleware/injectContext" {
    function _exports(schema: import("typeDefs/schema").schema, routeObject: import("typeDefs/route").route): (req: any, res: any, next: any) => void;
    export = _exports;
}
declare module "src/restSchema/middleware/beforeHook" {
    function _exports(req: any, res: any, next: any): Promise<any>;
    export = _exports;
}
declare module "src/restSchema/middleware/afterMiddlewareHook" {
    function _exports(req: any, res: any, next: any): Promise<any>;
    export = _exports;
}
declare module "src/restSchema/registerRoute" {
    function _exports(router: any, routeObject: any, schema: any): void;
    export = _exports;
}
declare module "src/restSchema/schemaBuilder" {
    export = SchemaBuilder;
    class SchemaBuilder {
        /**
         *
         * @param {import("../../typeDefs/schema").schema} schema
         */
        constructor(schema: import("../../typeDefs/schema").schema);
        defaults: any;
        schema: import("typeDefs/schema").schema;
        name: string;
        tempContext: import("typeDefs/context").context;
        createTempContext(): import("typeDefs/context").context;
        resource(): import("express-serve-static-core").Router;
        use(callback: any): any;
        setDefaultField(...args: any[]): void;
        setDefaultMessages(...args: any[]): void;
        setDefaultValidationMessages(...args: any[]): void;
        setDefaultRoute(...args: any[]): void;
        setDefaultRouteMeta(...args: any[]): void;
        setDefaultRouteFilteringOperators(...args: any[]): void;
        setDefaultSchema(...args: any[]): void;
        setDefaultSchemaFields(...args: any[]): void;
        setDefaultSchemaPagination(...args: any[]): void;
        setDefaultSchemaRoutes(...args: any[]): void;
        setDefaultSchemaWrappers(...args: any[]): void;
        addMiddleware(...args: any[]): void;
        addHook(...args: any[]): void;
    }
}
declare module "typeDefs/field" {
    export type resource = import("typeDefs/context").resource;
    export type fieldType = (ArrayConstructor | BooleanConstructor | StringConstructor | {
        (val: any): import("mongoose").Types.ObjectId;
        isValid: typeof import("bson").ObjectId.isValid;
        createFromHexString: typeof import("bson").ObjectId.createFromHexString;
        createFromTime: typeof import("bson").ObjectId.createFromTime;
        generate: typeof import("bson").ObjectId.generate;
        cacheHexString: boolean;
        prototype: any;
    } | MapConstructor | ArrayBufferConstructor | NumberConstructor | DateConstructor | ObjectConstructor);
    export type context = import("typeDefs/context").context;
    export type handlerCallback = (ctx: context) => any;
    export type objectForHandlerCallbackRoute = {
        create?: handlerCallback;
        update?: handlerCallback;
        delete?: handlerCallback;
        index?: handlerCallback;
        single?: handlerCallback;
        validate?: handlerCallback;
        count?: handlerCallback;
    };
    export type objectForHandlerCallback = (objectForHandlerCallbackRoute | {
        [x: string]: handlerCallback;
    });
    export type fieldPropHandler = handlerCallback | objectForHandlerCallback;
    export type handlerCallbackWithValue = (value: any, ctx: context) => any;
    export type objectForHandlerCallbackWithValueRoute = {
        create?: handlerCallbackWithValue;
        update?: handlerCallbackWithValue;
        delete?: handlerCallbackWithValue;
        index?: handlerCallbackWithValue;
        single?: handlerCallbackWithValue;
        validate?: handlerCallbackWithValue;
        count?: handlerCallbackWithValue;
    };
    export type objectForHandlerCallbackWithValue = (objectForHandlerCallbackWithValueRoute | {
        [x: string]: handlerCallbackWithValue;
    });
    export type fieldPropHandlerWithValue = handlerCallbackWithValue | objectForHandlerCallbackWithValue;
    export type objectForBoolean = {
        create?: boolean;
        update?: boolean;
        delete?: boolean;
        index?: boolean;
        single?: boolean;
        validate?: boolean;
        count?: boolean;
    };
    export type objectForNumber = {
        create?: number;
        update?: number;
        delete?: number;
        index?: number;
        single?: number;
        validate?: number;
        count?: number;
    };
    export type objectForString = {
        create?: string;
        update?: string;
        delete?: string;
        index?: string;
        single?: string;
        validate?: string;
        count?: string;
    };
    export type objectForNumberArray = {
        create?: number[];
        update?: number[];
        delete?: number[];
        index?: number[];
        single?: number[];
        validate?: number[];
        count?: number[];
    };
    export type objectForStringArray = {
        create?: string[];
        update?: string[];
        delete?: string[];
        index?: string[];
        single?: string[];
        validate?: string[];
        count?: string[];
    };
    export type objectForNumberRegExp = {
        create?: RegExp;
        update?: RegExp;
        delete?: RegExp;
        index?: RegExp;
        single?: RegExp;
        validate?: RegExp;
        count?: RegExp;
    };
    export type relation = {
        schemaBuilder: import("../src/restSchema/schemaBuilder");
        type: ("collection" | "resource");
        field: field;
        fieldName: string;
    };
    export type findCallback = (resource?: resource, ctx?: context, relationCtx?: context, relation?: relation) => object;
    export type fieldProps = {
        type?: (field[] | {
            [x: string]: field;
        } | fieldType);
        key?: string;
        nestedKey?: string;
        uniqueKey?: string;
        isNested?: boolean;
        isArrayNested?: boolean;
        isObjectNested?: boolean;
        children?: fields;
        of?: (field[] | {
            [x: string]: field;
        } | fieldType);
        creatable?: (objectForBoolean | boolean | fieldPropHandler);
        updatable?: (objectForBoolean | boolean | fieldPropHandler);
        filterable?: (objectForBoolean | boolean | fieldPropHandler);
        sortable?: (objectForBoolean | boolean | fieldPropHandler);
        hide?: (objectForBoolean | boolean | fieldPropHandler);
        hideByDefault?: (objectForBoolean | boolean | fieldPropHandler);
        get?: fieldPropHandlerWithValue;
        set?: fieldPropHandlerWithValue;
        sanitize?: fieldPropHandlerWithValue;
        trim?: objectForBoolean | boolean;
        lowercase?: objectForBoolean | boolean;
        uppercase?: objectForBoolean | boolean;
        default?: (fieldPropHandler | string | number | boolean | Date);
        pickUniqueItems?: objectForBoolean | boolean;
        ref?: string;
        refPath?: string | fieldPropHandler;
        find?: findCallback;
        validate?: fieldPropHandlerWithValue;
        unique?: objectForBoolean | boolean | fieldPropHandler;
        required?: objectForBoolean | boolean | fieldPropHandler;
        between?: Array<number> | objectForNumberArray | fieldPropHandler;
        min?: objectForNumber | number | fieldPropHandler;
        max?: objectForNumber | number | fieldPropHandler;
        minLength?: objectForNumber | number | fieldPropHandler;
        maxLength?: objectForNumber | number | fieldPropHandler;
        betweenLength?: objectForNumber | number | fieldPropHandler;
        match?: RegExp | objectForNumberRegExp | fieldPropHandler;
        enum?: Array<string> | objectForStringArray | fieldPropHandler;
        existsIn?: objectForString | string | fieldPropHandler;
    };
    export type fieldsFunction = (context: context) => (fields | Promise<fields>);
    export type field = (fieldProps | {
        [x: string]: any;
    });
    export type fields = (fieldsFunction | {
        [x: string]: field;
    });
    import { Date } from "src/restSchema/types";
    import { Array } from "src/restSchema/types";
}
declare module "typeDefs/schema" {
    export type context = import("typeDefs/context").context;
    export type hookNamesList = ("before" | "after" | "error" | "beforeCreateResource" | "afterCreateResource" | "afterDeleteResource" | "beforeGetCollection" | "afterGetCollection" | "beforeGetCollectionResponse" | "afterGetCollectionResponse" | "beforeGetResource" | "afterGetResource" | "beforeGetResourceResponse" | "afterGetResourceResponse" | "beforeUpdateResource" | "afterUpdateResource" | "afterMiddleware");
    export type fields = import("typeDefs/field").fields;
    export type routes = import("typeDefs/route").routes;
    export type defaults = import("src/restSchema/defaults/index").defaults;
    export type pagination = {
        page?: number;
        limit?: number;
        minLimit?: number;
        maxLimit?: number;
        sort?: string;
        defaultFilters?: object;
        skip?: number;
    };
    export type errorCallback = (err: import("../src/restSchema/errors/restSchemaError"), req: import("express").Request, res: import("express").Response, next: Function) => any;
    export type responseCallback = (res: Response, ctx: context) => any;
    export type wrappers = {
        response: responseCallback;
        error: errorCallback;
    };
    export type expressRequestHandler = import("node_modules/@types/express/index").RequestHandler;
    export type next = (error?: Error) => any;
    export type requestHandler = () => any;
    export type routesSpecificMiddleware = {
        create?: (requestHandler | Array<requestHandler>);
        update?: (requestHandler | Array<requestHandler>);
        count?: (requestHandler | Array<requestHandler>);
        single?: (requestHandler | Array<requestHandler>);
        index?: (requestHandler | Array<requestHandler>);
        validate?: (requestHandler | Array<requestHandler>);
        delete?: (requestHandler | Array<requestHandler>);
    };
    export type routesMiddleware = (routesSpecificMiddleware | {
        [x: string]: requestHandler;
    } | {
        [x: string]: Array<requestHandler>;
    });
    export type middleware = (routesMiddleware | Array<requestHandler> | requestHandler);
    export type hookHandler = (ctx: context) => any;
    export type hooksList = {
        before?: (hookHandler | Promise<hookHandler>);
        after?: (hookHandler | Promise<hookHandler>);
        error?: (hookHandler | Promise<hookHandler>);
        beforeCreateResource?: (hookHandler | Promise<hookHandler>);
        afterCreateResource?: (hookHandler | Promise<hookHandler>);
        afterDeleteResource?: (hookHandler | Promise<hookHandler>);
        beforeGetCollection?: (hookHandler | Promise<hookHandler>);
        afterGetCollection?: (hookHandler | Promise<hookHandler>);
        beforeGetCollectionResponse?: (hookHandler | Promise<hookHandler>);
        afterGetCollectionResponse?: (hookHandler | Promise<hookHandler>);
        beforeGetResource?: (hookHandler | Promise<hookHandler>);
        afterGetResource?: (hookHandler | Promise<hookHandler>);
        beforeGetResourceResponse?: (hookHandler | Promise<hookHandler>);
        afterGetResourceResponse?: (hookHandler | Promise<hookHandler>);
        beforeUpdateResource?: (hookHandler | Promise<hookHandler>);
        afterUpdateResource?: (hookHandler | Promise<hookHandler>);
        afterMiddleware?: (hookHandler | Promise<hookHandler>);
    };
    export type hooksListWithRoute = {
        global?: hooksList;
        create?: hooksList;
        update?: hooksList;
        delete?: hooksList;
        index?: hooksList;
        single?: hooksList;
        count?: hooksList;
        validate?: hooksList;
    };
    export type hooks = (hooksList & hooksListWithRoute);
    export type model = import("mongoose").Model<any, any>;
    export type schema = {
        model?: import("mongoose").Model<any, any>;
        fields?: fields;
        routes?: routes;
        pagination?: pagination;
        wrappers?: wrappers;
        filters?: object;
        middleware?: middleware;
        routeKeys?: Array<string>;
        hooks?: hooks;
        defaults?: defaults;
        name?: string;
    };
}
declare module "typeDefs/context" {
    export type schema = import("typeDefs/schema").schema;
    export type fields = import("typeDefs/field").fields;
    export type resourceDocument = import("mongoose").Document;
    export type resource = resourceDocument & {
        [x: string]: any;
    };
    export type modelDocument = import("mongoose").Model<any, any>;
    export type model = import("mongoose").Model<any, any> & {
        [x: string]: any;
    };
    export type route = import("typeDefs/route").route;
    export type defaultDefaults = import("src/restSchema/defaults/index").defaults;
    export type defaults = defaultDefaults & {
        [x: string]: any;
    };
    export type contextMethods = {
        cast: (value: any, type?: any) => import("src/restSchema/helpers/cast").RSConvertTo;
        createResource: ({ setResource, setCreatedResource, inputs }?: {
            setResource?: boolean;
            /**
             * @typedef {import("mongoose").Model} modelDocument
             * @typedef {modelDocument & Object<string , any>} model
             */
            /**
             * @typedef {import("./route").route} route
             */
            /**
             * @typedef {import("../src/restSchema/defaults").defaults} defaultDefaults
             * @typedef {defaultDefaults & Object<string , *>} defaults
             */
            /**
             * @typedef {object} contextMethods
             * @property {import('../src/restSchema/contextMethods/cast')} cast
             * @property {import('../src/restSchema/contextMethods/createResource')} createResource
             * @property {import('../src/restSchema/contextMethods/deleteResource')} deleteResource
             * @property {import('../src/restSchema/contextMethods/findLocationOfInput')} findLocationOfInput
             * @property {import('../src/restSchema/contextMethods/getCollection')} getCollection
             * @property {import('../src/restSchema/contextMethods/getCreateFields')} getCreateFields
             * @property {import('../src/restSchema/contextMethods/getCreateInputs')} getCreateInputs
             * @property {import('../src/restSchema/contextMethods/getCustomFilters')} getCustomFilters
             * @property {import('../src/restSchema/contextMethods/getFields')} getFields
             * @property {import('../src/restSchema/contextMethods/getFilters')} getFilters
             * @property {import('../src/restSchema/contextMethods/getInputs')} getInputs
             * @property {import('../src/restSchema/contextMethods/getInputsFromFields')} getInputsFromFields
             * @property {import('../src/restSchema/contextMethods/getLimit')} getLimit
             * @property {import('../src/restSchema/contextMethods/getMessages')} getMessages
             * @property {import('../src/restSchema/contextMethods/getNestedField')} getNestedField
             * @property {import('../src/restSchema/contextMethods/getNestedInput')} getNestedInput
             * @property {import('../src/restSchema/contextMethods/getPage')} getPage
             * @property {import('../src/restSchema/contextMethods/getRelations')} getRelations
             * @property {import('../src/restSchema/contextMethods/getResource')} getResource
             * @property {import('../src/restSchema/contextMethods/getResourceResponse')} getResourceResponse
             * @property {import('../src/restSchema/contextMethods/getResponseValuesFromResource')} getResponseValuesFromResource
             * @property {import('../src/restSchema/contextMethods/getRouteKeys')} getRouteKeys
             * @property {import('../src/restSchema/contextMethods/getRouteKeysFilters')} getRouteKeysFilters
             * @property {import('../src/restSchema/contextMethods/getRoutes')} getRoutes
             * @property {import('../src/restSchema/contextMethods/getSelectFields')} getSelectFields
             * @property {import('../src/restSchema/contextMethods/getSkip')} getSkip
             * @property {import('../src/restSchema/contextMethods/getSort')} getSort
             * @property {import('../src/restSchema/contextMethods/getTotal')} getTotal
             * @property {import('../src/restSchema/contextMethods/getUpdateFields')} getUpdateFields
             * @property {import('../src/restSchema/contextMethods/getUpdateInputs')} getUpdateInputs
             * @property {import('../src/restSchema/contextMethods/hook')} hook
             * @property {import('../src/restSchema/contextMethods/sanitizeInput')} sanitizeInput
             * @property {import('../src/restSchema/contextMethods/sanitizeInputs')} sanitizeInputs
             * @property {import('../src/restSchema/contextMethods/setPaginationHeaders')} setPaginationHeaders
             * @property {import('../src/restSchema/contextMethods/updateResource')} updateResource
             * @property {import('../src/restSchema/contextMethods/validateInput')} validateInput
             * @property {import('../src/restSchema/contextMethods/validateInputs')} validateInputs
             * @property {import('../src/restSchema/contextMethods/getCollectionResponse')} getCollectionResponse
             * @property {import('../src/restSchema/contextMethods/getDirtyInputs')} getDirtyInputs
             *
             */
            /**
             * @typedef {object} validationError
             * @property {string} field
             * @property {*} value
             * @property {string} message
             * @property {string} location
             *
             * @typedef {Array.<validationError>} validationErrors
             */
            /**
             * @typedef {import("express").Request} request
             * @typedef {import("express").Response} response
             */
            /**
             * @typedef {object} contextProps
             * @property {schema} schema
             * @property {model} model
             * @property {('index' | 'single' | 'get' | 'update' | 'validate' | 'count' | 'delete' | string)} route
             * @property {route} routeObject
             * @property {defaults} defaults
             * @property {object} relationFilters
             * @property {resource} [resource]
             * @property {resource} [updatedResource]
             * @property {resource} [createdResource]
             * @property {resource} [deletedResource]
             * @property {resource} [deletedResource]
             * @property {Array.<resource>} [collection]
             * @property {request & Object.<string , any>} [req]
             * @property {response & Object.<string , any>} [res]
             * @property {function} [next]
             * @property {fields} [fields]
             * @property {object} [response]
             * @property {object} [collectionResponse]
             * @property {object} [inputs]
             * @property {object} [createInputs]
             * @property {object} [updateInputs]
             * @property {string[]} [routeKeys]
             * @property {number} [total]
             * @property {validationErrors} [validationErrors]
             * @property {boolean} [isRelation]
             * @property {context} [parent]
             * @property {object} [dirtyInputs]
             *
             *
             * @typedef {contextProps & contextMethods} context
             */
            setCreatedResource?: boolean;
            inputs?: any;
        }) => Promise<resource>;
        deleteResource: ({ setDeletedResource, resource, filters }?: {
            setDeletedResource?: boolean;
            resource?: resource;
            filters?: boolean;
        }) => Promise<resource>;
        findLocationOfInput: ({ key, req, inputsTargets }: {
            key: string;
            req?: string;
            inputsTargets?: string;
        }) => Promise<resource>;
        getCollection: ({ setCollection, force, filters, skip, limit, sort, filtersMeta }?: {
            setCollection?: boolean;
            force?: boolean;
            filters?: any;
            skip?: number;
            limit?: number;
            /**
             * @typedef {import("../src/restSchema/defaults").defaults} defaultDefaults
             * @typedef {defaultDefaults & Object<string , *>} defaults
             */
            /**
             * @typedef {object} contextMethods
             * @property {import('../src/restSchema/contextMethods/cast')} cast
             * @property {import('../src/restSchema/contextMethods/createResource')} createResource
             * @property {import('../src/restSchema/contextMethods/deleteResource')} deleteResource
             * @property {import('../src/restSchema/contextMethods/findLocationOfInput')} findLocationOfInput
             * @property {import('../src/restSchema/contextMethods/getCollection')} getCollection
             * @property {import('../src/restSchema/contextMethods/getCreateFields')} getCreateFields
             * @property {import('../src/restSchema/contextMethods/getCreateInputs')} getCreateInputs
             * @property {import('../src/restSchema/contextMethods/getCustomFilters')} getCustomFilters
             * @property {import('../src/restSchema/contextMethods/getFields')} getFields
             * @property {import('../src/restSchema/contextMethods/getFilters')} getFilters
             * @property {import('../src/restSchema/contextMethods/getInputs')} getInputs
             * @property {import('../src/restSchema/contextMethods/getInputsFromFields')} getInputsFromFields
             * @property {import('../src/restSchema/contextMethods/getLimit')} getLimit
             * @property {import('../src/restSchema/contextMethods/getMessages')} getMessages
             * @property {import('../src/restSchema/contextMethods/getNestedField')} getNestedField
             * @property {import('../src/restSchema/contextMethods/getNestedInput')} getNestedInput
             * @property {import('../src/restSchema/contextMethods/getPage')} getPage
             * @property {import('../src/restSchema/contextMethods/getRelations')} getRelations
             * @property {import('../src/restSchema/contextMethods/getResource')} getResource
             * @property {import('../src/restSchema/contextMethods/getResourceResponse')} getResourceResponse
             * @property {import('../src/restSchema/contextMethods/getResponseValuesFromResource')} getResponseValuesFromResource
             * @property {import('../src/restSchema/contextMethods/getRouteKeys')} getRouteKeys
             * @property {import('../src/restSchema/contextMethods/getRouteKeysFilters')} getRouteKeysFilters
             * @property {import('../src/restSchema/contextMethods/getRoutes')} getRoutes
             * @property {import('../src/restSchema/contextMethods/getSelectFields')} getSelectFields
             * @property {import('../src/restSchema/contextMethods/getSkip')} getSkip
             * @property {import('../src/restSchema/contextMethods/getSort')} getSort
             * @property {import('../src/restSchema/contextMethods/getTotal')} getTotal
             * @property {import('../src/restSchema/contextMethods/getUpdateFields')} getUpdateFields
             * @property {import('../src/restSchema/contextMethods/getUpdateInputs')} getUpdateInputs
             * @property {import('../src/restSchema/contextMethods/hook')} hook
             * @property {import('../src/restSchema/contextMethods/sanitizeInput')} sanitizeInput
             * @property {import('../src/restSchema/contextMethods/sanitizeInputs')} sanitizeInputs
             * @property {import('../src/restSchema/contextMethods/setPaginationHeaders')} setPaginationHeaders
             * @property {import('../src/restSchema/contextMethods/updateResource')} updateResource
             * @property {import('../src/restSchema/contextMethods/validateInput')} validateInput
             * @property {import('../src/restSchema/contextMethods/validateInputs')} validateInputs
             * @property {import('../src/restSchema/contextMethods/getCollectionResponse')} getCollectionResponse
             * @property {import('../src/restSchema/contextMethods/getDirtyInputs')} getDirtyInputs
             *
             */
            /**
             * @typedef {object} validationError
             * @property {string} field
             * @property {*} value
             * @property {string} message
             * @property {string} location
             *
             * @typedef {Array.<validationError>} validationErrors
             */
            /**
             * @typedef {import("express").Request} request
             * @typedef {import("express").Response} response
             */
            /**
             * @typedef {object} contextProps
             * @property {schema} schema
             * @property {model} model
             * @property {('index' | 'single' | 'get' | 'update' | 'validate' | 'count' | 'delete' | string)} route
             * @property {route} routeObject
             * @property {defaults} defaults
             * @property {object} relationFilters
             * @property {resource} [resource]
             * @property {resource} [updatedResource]
             * @property {resource} [createdResource]
             * @property {resource} [deletedResource]
             * @property {resource} [deletedResource]
             * @property {Array.<resource>} [collection]
             * @property {request & Object.<string , any>} [req]
             * @property {response & Object.<string , any>} [res]
             * @property {function} [next]
             * @property {fields} [fields]
             * @property {object} [response]
             * @property {object} [collectionResponse]
             * @property {object} [inputs]
             * @property {object} [createInputs]
             * @property {object} [updateInputs]
             * @property {string[]} [routeKeys]
             * @property {number} [total]
             * @property {validationErrors} [validationErrors]
             * @property {boolean} [isRelation]
             * @property {context} [parent]
             * @property {object} [dirtyInputs]
             *
             *
             * @typedef {contextProps & contextMethods} context
             */
            sort?: any;
            filtersMeta?: any;
        }) => Promise<resource[]>;
        getCreateFields: ({ fields }?: {
            fields?: import("typeDefs/field").fields;
        }) => Promise<import("typeDefs/field").fields>;
        getCreateInputs: ({ setCreateInputs, fields, inputs }?: {
            setCreateInputs?: boolean;
            /**
             * @typedef {import("./route").route} route
             */
            /**
             * @typedef {import("../src/restSchema/defaults").defaults} defaultDefaults
             * @typedef {defaultDefaults & Object<string , *>} defaults
             */
            /**
             * @typedef {object} contextMethods
             * @property {import('../src/restSchema/contextMethods/cast')} cast
             * @property {import('../src/restSchema/contextMethods/createResource')} createResource
             * @property {import('../src/restSchema/contextMethods/deleteResource')} deleteResource
             * @property {import('../src/restSchema/contextMethods/findLocationOfInput')} findLocationOfInput
             * @property {import('../src/restSchema/contextMethods/getCollection')} getCollection
             * @property {import('../src/restSchema/contextMethods/getCreateFields')} getCreateFields
             * @property {import('../src/restSchema/contextMethods/getCreateInputs')} getCreateInputs
             * @property {import('../src/restSchema/contextMethods/getCustomFilters')} getCustomFilters
             * @property {import('../src/restSchema/contextMethods/getFields')} getFields
             * @property {import('../src/restSchema/contextMethods/getFilters')} getFilters
             * @property {import('../src/restSchema/contextMethods/getInputs')} getInputs
             * @property {import('../src/restSchema/contextMethods/getInputsFromFields')} getInputsFromFields
             * @property {import('../src/restSchema/contextMethods/getLimit')} getLimit
             * @property {import('../src/restSchema/contextMethods/getMessages')} getMessages
             * @property {import('../src/restSchema/contextMethods/getNestedField')} getNestedField
             * @property {import('../src/restSchema/contextMethods/getNestedInput')} getNestedInput
             * @property {import('../src/restSchema/contextMethods/getPage')} getPage
             * @property {import('../src/restSchema/contextMethods/getRelations')} getRelations
             * @property {import('../src/restSchema/contextMethods/getResource')} getResource
             * @property {import('../src/restSchema/contextMethods/getResourceResponse')} getResourceResponse
             * @property {import('../src/restSchema/contextMethods/getResponseValuesFromResource')} getResponseValuesFromResource
             * @property {import('../src/restSchema/contextMethods/getRouteKeys')} getRouteKeys
             * @property {import('../src/restSchema/contextMethods/getRouteKeysFilters')} getRouteKeysFilters
             * @property {import('../src/restSchema/contextMethods/getRoutes')} getRoutes
             * @property {import('../src/restSchema/contextMethods/getSelectFields')} getSelectFields
             * @property {import('../src/restSchema/contextMethods/getSkip')} getSkip
             * @property {import('../src/restSchema/contextMethods/getSort')} getSort
             * @property {import('../src/restSchema/contextMethods/getTotal')} getTotal
             * @property {import('../src/restSchema/contextMethods/getUpdateFields')} getUpdateFields
             * @property {import('../src/restSchema/contextMethods/getUpdateInputs')} getUpdateInputs
             * @property {import('../src/restSchema/contextMethods/hook')} hook
             * @property {import('../src/restSchema/contextMethods/sanitizeInput')} sanitizeInput
             * @property {import('../src/restSchema/contextMethods/sanitizeInputs')} sanitizeInputs
             * @property {import('../src/restSchema/contextMethods/setPaginationHeaders')} setPaginationHeaders
             * @property {import('../src/restSchema/contextMethods/updateResource')} updateResource
             * @property {import('../src/restSchema/contextMethods/validateInput')} validateInput
             * @property {import('../src/restSchema/contextMethods/validateInputs')} validateInputs
             * @property {import('../src/restSchema/contextMethods/getCollectionResponse')} getCollectionResponse
             * @property {import('../src/restSchema/contextMethods/getDirtyInputs')} getDirtyInputs
             *
             */
            /**
             * @typedef {object} validationError
             * @property {string} field
             * @property {*} value
             * @property {string} message
             * @property {string} location
             *
             * @typedef {Array.<validationError>} validationErrors
             */
            /**
             * @typedef {import("express").Request} request
             * @typedef {import("express").Response} response
             */
            /**
             * @typedef {object} contextProps
             * @property {schema} schema
             * @property {model} model
             * @property {('index' | 'single' | 'get' | 'update' | 'validate' | 'count' | 'delete' | string)} route
             * @property {route} routeObject
             * @property {defaults} defaults
             * @property {object} relationFilters
             * @property {resource} [resource]
             * @property {resource} [updatedResource]
             * @property {resource} [createdResource]
             * @property {resource} [deletedResource]
             * @property {resource} [deletedResource]
             * @property {Array.<resource>} [collection]
             * @property {request & Object.<string , any>} [req]
             * @property {response & Object.<string , any>} [res]
             * @property {function} [next]
             * @property {fields} [fields]
             * @property {object} [response]
             * @property {object} [collectionResponse]
             * @property {object} [inputs]
             * @property {object} [createInputs]
             * @property {object} [updateInputs]
             * @property {string[]} [routeKeys]
             * @property {number} [total]
             * @property {validationErrors} [validationErrors]
             * @property {boolean} [isRelation]
             * @property {context} [parent]
             * @property {object} [dirtyInputs]
             *
             *
             * @typedef {contextProps & contextMethods} context
             */
            fields?: import("typeDefs/field").fields;
            inputs?: any;
        }) => Promise<any>;
        getCustomFilters: ({ filters, route, routes, relationFilters }?: {
            filters?: any;
            route?: string;
            routes?: import("src/restSchema/contextMethods/getCustomFilters").routes;
            relationFilters?: any;
        }) => Promise<any>;
        getFields: ({ setFields, fields }?: {
            setFields?: boolean;
            fields?: import("typeDefs/field").fields;
        }) => Promise<import("typeDefs/field").fields>;
        getFilters: ({ inputs, operators, defaultRouteFilters, customFilters, filteringMeta }?: {
            inputs?: any;
            operators?: import("typeDefs/route").filteringOperators;
            defaultRouteFilters?: any;
            customFilters?: any;
            filteringMeta?: any;
        }) => Promise<any>;
        getInputs: ({ setInputs, req, inputsTarget, force }?: {
            setInputs?: boolean;
            req?: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            inputsTarget?: string[];
            force?: boolean;
        }) => Promise<any>;
        getInputsFromFields: ({ fields, inputs }?: {
            fields?: import("typeDefs/field").fields;
            inputs?: any;
        }) => Promise<any>;
        getLimit: ({ defaultLimit, maxLimit, minLimit, limitKey, inputs }?: {
            defaultLimit?: number;
            maxLimit?: number;
            minLimit?: number;
            limitKey?: string;
            inputs?: any;
        }) => Promise<number>;
        getMessages: () => {
            validations: {
                required: string;
                min: string;
                /**
                 * @typedef {import("mongoose").Document} resourceDocument
                 * @typedef {resourceDocument & Object<string , any>} resource
                 */
                /**
                 * @typedef {import("mongoose").Model} modelDocument
                 * @typedef {modelDocument & Object<string , any>} model
                 */
                /**
                 * @typedef {import("./route").route} route
                 */
                /**
                 * @typedef {import("../src/restSchema/defaults").defaults} defaultDefaults
                 * @typedef {defaultDefaults & Object<string , *>} defaults
                 */
                /**
                 * @typedef {object} contextMethods
                 * @property {import('../src/restSchema/contextMethods/cast')} cast
                 * @property {import('../src/restSchema/contextMethods/createResource')} createResource
                 * @property {import('../src/restSchema/contextMethods/deleteResource')} deleteResource
                 * @property {import('../src/restSchema/contextMethods/findLocationOfInput')} findLocationOfInput
                 * @property {import('../src/restSchema/contextMethods/getCollection')} getCollection
                 * @property {import('../src/restSchema/contextMethods/getCreateFields')} getCreateFields
                 * @property {import('../src/restSchema/contextMethods/getCreateInputs')} getCreateInputs
                 * @property {import('../src/restSchema/contextMethods/getCustomFilters')} getCustomFilters
                 * @property {import('../src/restSchema/contextMethods/getFields')} getFields
                 * @property {import('../src/restSchema/contextMethods/getFilters')} getFilters
                 * @property {import('../src/restSchema/contextMethods/getInputs')} getInputs
                 * @property {import('../src/restSchema/contextMethods/getInputsFromFields')} getInputsFromFields
                 * @property {import('../src/restSchema/contextMethods/getLimit')} getLimit
                 * @property {import('../src/restSchema/contextMethods/getMessages')} getMessages
                 * @property {import('../src/restSchema/contextMethods/getNestedField')} getNestedField
                 * @property {import('../src/restSchema/contextMethods/getNestedInput')} getNestedInput
                 * @property {import('../src/restSchema/contextMethods/getPage')} getPage
                 * @property {import('../src/restSchema/contextMethods/getRelations')} getRelations
                 * @property {import('../src/restSchema/contextMethods/getResource')} getResource
                 * @property {import('../src/restSchema/contextMethods/getResourceResponse')} getResourceResponse
                 * @property {import('../src/restSchema/contextMethods/getResponseValuesFromResource')} getResponseValuesFromResource
                 * @property {import('../src/restSchema/contextMethods/getRouteKeys')} getRouteKeys
                 * @property {import('../src/restSchema/contextMethods/getRouteKeysFilters')} getRouteKeysFilters
                 * @property {import('../src/restSchema/contextMethods/getRoutes')} getRoutes
                 * @property {import('../src/restSchema/contextMethods/getSelectFields')} getSelectFields
                 * @property {import('../src/restSchema/contextMethods/getSkip')} getSkip
                 * @property {import('../src/restSchema/contextMethods/getSort')} getSort
                 * @property {import('../src/restSchema/contextMethods/getTotal')} getTotal
                 * @property {import('../src/restSchema/contextMethods/getUpdateFields')} getUpdateFields
                 * @property {import('../src/restSchema/contextMethods/getUpdateInputs')} getUpdateInputs
                 * @property {import('../src/restSchema/contextMethods/hook')} hook
                 * @property {import('../src/restSchema/contextMethods/sanitizeInput')} sanitizeInput
                 * @property {import('../src/restSchema/contextMethods/sanitizeInputs')} sanitizeInputs
                 * @property {import('../src/restSchema/contextMethods/setPaginationHeaders')} setPaginationHeaders
                 * @property {import('../src/restSchema/contextMethods/updateResource')} updateResource
                 * @property {import('../src/restSchema/contextMethods/validateInput')} validateInput
                 * @property {import('../src/restSchema/contextMethods/validateInputs')} validateInputs
                 * @property {import('../src/restSchema/contextMethods/getCollectionResponse')} getCollectionResponse
                 * @property {import('../src/restSchema/contextMethods/getDirtyInputs')} getDirtyInputs
                 *
                 */
                /**
                 * @typedef {object} validationError
                 * @property {string} field
                 * @property {*} value
                 * @property {string} message
                 * @property {string} location
                 *
                 * @typedef {Array.<validationError>} validationErrors
                 */
                /**
                 * @typedef {import("express").Request} request
                 * @typedef {import("express").Response} response
                 */
                /**
                 * @typedef {object} contextProps
                 * @property {schema} schema
                 * @property {model} model
                 * @property {('index' | 'single' | 'get' | 'update' | 'validate' | 'count' | 'delete' | string)} route
                 * @property {route} routeObject
                 * @property {defaults} defaults
                 * @property {object} relationFilters
                 * @property {resource} [resource]
                 * @property {resource} [updatedResource]
                 * @property {resource} [createdResource]
                 * @property {resource} [deletedResource]
                 * @property {resource} [deletedResource]
                 * @property {Array.<resource>} [collection]
                 * @property {request & Object.<string , any>} [req]
                 * @property {response & Object.<string , any>} [res]
                 * @property {function} [next]
                 * @property {fields} [fields]
                 * @property {object} [response]
                 * @property {object} [collectionResponse]
                 * @property {object} [inputs]
                 * @property {object} [createInputs]
                 * @property {object} [updateInputs]
                 * @property {string[]} [routeKeys]
                 * @property {number} [total]
                 * @property {validationErrors} [validationErrors]
                 * @property {boolean} [isRelation]
                 * @property {context} [parent]
                 * @property {object} [dirtyInputs]
                 *
                 *
                 * @typedef {contextProps & contextMethods} context
                 */
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
            idParamNotFound: string;
            resourceNotFound: string;
            validationPassed: string;
            inactiveRouteMessage: string;
            listOfErrors: string;
        };
        getNestedField: ({ key, fields }: {
            key: string;
            fields?: import("typeDefs/field").fields;
        }) => Promise<import("typeDefs/field").field>;
        getNestedInput: ({ key, inputs }: {
            key: string;
            inputs?: any;
        }) => Promise<any>;
        getPage: ({ skip, limit }?: {
            skip?: number;
            limit?: number;
        }) => Promise<number>;
        getRelations: ({ fields }?: {
            fields?: import("typeDefs/field").fields;
        }) => Promise<any>;
        getResource: ({ errorOnNotFound, setResource, force, resourceId, model, filters }?: {
            errorOnNotFound?: boolean;
            setResource?: boolean;
            force?: boolean;
            resourceId?: any;
            model?: model;
            filters?: any;
        }) => Promise<resource>;
        getResourceResponse: ({ resource }?: {
            resource?: resource;
        }) => Promise<any>;
        getResponseValuesFromResource: ({ fields, resource, selectFields }?: {
            fields?: import("typeDefs/field").fields;
            resource?: resource;
            selectFields?: import("typeDefs/field").fields;
        }) => Promise<any>;
        getRouteKeys: () => string[];
        getRouteKeysFilters: ({ routeKeys, req, id, idKey, idTarget, fallbackFilters }?: {
            routeKeys?: string[];
            req?: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            id?: any;
            idKey?: string;
            idTarget?: string;
            fallbackFilters?: any;
        }) => Promise<any>;
        getRoutes: () => import("typeDefs/route").routes;
        getSelectFields: ({ resource, fields, selectInputKey, inputs, routeObject, selectable }?: {
            resource?: resource;
            fields?: import("typeDefs/field").fields;
            selectInputKey?: string;
            inputs?: any;
            routeObject?: import("typeDefs/route").route;
            selectable?: boolean;
        }) => Promise<import("typeDefs/field").fields>;
        getSkip: ({ skip, inputs, skipInputKey, page, pageInputKey, defaultPage, limit }?: {
            skip?: number;
            inputs?: any;
            skipInputKey?: string;
            page?: number;
            pageInputKey?: string;
            defaultPage?: number;
            limit?: number;
        }) => Promise<number>;
        getSort: ({ inputs, sortKey, defaultSort, sortString }?: {
            sortKey?: string;
            inputs?: any;
            defaultSort?: any;
            sortString?: string;
        }) => Promise<any>;
        getTotal: ({ setTotal, filters }?: {
            setTotal?: boolean;
            filters?: any;
        }) => Promise<number>;
        getUpdateFields: ({ fields }?: {
            fields?: import("typeDefs/field").fields;
        }) => Promise<import("typeDefs/field").fields>;
        getUpdateInputs: ({ setUpdateInputs, updateFields }?: {
            setUpdateInputs?: boolean;
            updateFields?: import("typeDefs/field").fields;
        }) => Promise<any>;
        hook: (hook: string) => Promise<any>;
        sanitizeInput: ({ value, field }: {
            value: any;
            field: import("typeDefs/field").field;
        }) => Promise<any>;
        sanitizeInputs: ({ setInputs, fields, inputs, setDirtyInputs }?: {
            setInputs?: boolean;
            fields?: import("typeDefs/field").fields;
            inputs?: any;
            setDirtyInputs?: boolean;
        }) => Promise<any>;
        setPaginationHeaders: ({ res, total, collection, count, skip, limit, page, start, end, range, hasPrevPage, hasNextPage, prevPage, nextPage, lastPage }?: {
            res?: import("express").Response<any, Record<string, any>>;
            total?: number;
            /**
             * @typedef {import("../src/restSchema/defaults").defaults} defaultDefaults
             * @typedef {defaultDefaults & Object<string , *>} defaults
             */
            /**
             * @typedef {object} contextMethods
             * @property {import('../src/restSchema/contextMethods/cast')} cast
             * @property {import('../src/restSchema/contextMethods/createResource')} createResource
             * @property {import('../src/restSchema/contextMethods/deleteResource')} deleteResource
             * @property {import('../src/restSchema/contextMethods/findLocationOfInput')} findLocationOfInput
             * @property {import('../src/restSchema/contextMethods/getCollection')} getCollection
             * @property {import('../src/restSchema/contextMethods/getCreateFields')} getCreateFields
             * @property {import('../src/restSchema/contextMethods/getCreateInputs')} getCreateInputs
             * @property {import('../src/restSchema/contextMethods/getCustomFilters')} getCustomFilters
             * @property {import('../src/restSchema/contextMethods/getFields')} getFields
             * @property {import('../src/restSchema/contextMethods/getFilters')} getFilters
             * @property {import('../src/restSchema/contextMethods/getInputs')} getInputs
             * @property {import('../src/restSchema/contextMethods/getInputsFromFields')} getInputsFromFields
             * @property {import('../src/restSchema/contextMethods/getLimit')} getLimit
             * @property {import('../src/restSchema/contextMethods/getMessages')} getMessages
             * @property {import('../src/restSchema/contextMethods/getNestedField')} getNestedField
             * @property {import('../src/restSchema/contextMethods/getNestedInput')} getNestedInput
             * @property {import('../src/restSchema/contextMethods/getPage')} getPage
             * @property {import('../src/restSchema/contextMethods/getRelations')} getRelations
             * @property {import('../src/restSchema/contextMethods/getResource')} getResource
             * @property {import('../src/restSchema/contextMethods/getResourceResponse')} getResourceResponse
             * @property {import('../src/restSchema/contextMethods/getResponseValuesFromResource')} getResponseValuesFromResource
             * @property {import('../src/restSchema/contextMethods/getRouteKeys')} getRouteKeys
             * @property {import('../src/restSchema/contextMethods/getRouteKeysFilters')} getRouteKeysFilters
             * @property {import('../src/restSchema/contextMethods/getRoutes')} getRoutes
             * @property {import('../src/restSchema/contextMethods/getSelectFields')} getSelectFields
             * @property {import('../src/restSchema/contextMethods/getSkip')} getSkip
             * @property {import('../src/restSchema/contextMethods/getSort')} getSort
             * @property {import('../src/restSchema/contextMethods/getTotal')} getTotal
             * @property {import('../src/restSchema/contextMethods/getUpdateFields')} getUpdateFields
             * @property {import('../src/restSchema/contextMethods/getUpdateInputs')} getUpdateInputs
             * @property {import('../src/restSchema/contextMethods/hook')} hook
             * @property {import('../src/restSchema/contextMethods/sanitizeInput')} sanitizeInput
             * @property {import('../src/restSchema/contextMethods/sanitizeInputs')} sanitizeInputs
             * @property {import('../src/restSchema/contextMethods/setPaginationHeaders')} setPaginationHeaders
             * @property {import('../src/restSchema/contextMethods/updateResource')} updateResource
             * @property {import('../src/restSchema/contextMethods/validateInput')} validateInput
             * @property {import('../src/restSchema/contextMethods/validateInputs')} validateInputs
             * @property {import('../src/restSchema/contextMethods/getCollectionResponse')} getCollectionResponse
             * @property {import('../src/restSchema/contextMethods/getDirtyInputs')} getDirtyInputs
             *
             */
            /**
             * @typedef {object} validationError
             * @property {string} field
             * @property {*} value
             * @property {string} message
             * @property {string} location
             *
             * @typedef {Array.<validationError>} validationErrors
             */
            /**
             * @typedef {import("express").Request} request
             * @typedef {import("express").Response} response
             */
            /**
             * @typedef {object} contextProps
             * @property {schema} schema
             * @property {model} model
             * @property {('index' | 'single' | 'get' | 'update' | 'validate' | 'count' | 'delete' | string)} route
             * @property {route} routeObject
             * @property {defaults} defaults
             * @property {object} relationFilters
             * @property {resource} [resource]
             * @property {resource} [updatedResource]
             * @property {resource} [createdResource]
             * @property {resource} [deletedResource]
             * @property {resource} [deletedResource]
             * @property {Array.<resource>} [collection]
             * @property {request & Object.<string , any>} [req]
             * @property {response & Object.<string , any>} [res]
             * @property {function} [next]
             * @property {fields} [fields]
             * @property {object} [response]
             * @property {object} [collectionResponse]
             * @property {object} [inputs]
             * @property {object} [createInputs]
             * @property {object} [updateInputs]
             * @property {string[]} [routeKeys]
             * @property {number} [total]
             * @property {validationErrors} [validationErrors]
             * @property {boolean} [isRelation]
             * @property {context} [parent]
             * @property {object} [dirtyInputs]
             *
             *
             * @typedef {contextProps & contextMethods} context
             */
            collection?: resource[];
            count?: number;
            skip?: number;
            limit?: number;
            page?: number;
            start?: number;
            end?: number;
            range?: number;
            hasPrevPage?: boolean;
            hasNextPage?: boolean;
            prevPage?: string | number;
            nextPage?: string | number;
            lastPage?: number;
        }) => Promise<any>;
        updateResource: ({ setResource, setUpdatedResource, resource, filters }?: {
            setResource?: boolean; /**
             * @typedef {import("../src/restSchema/defaults").defaults} defaultDefaults
             * @typedef {defaultDefaults & Object<string , *>} defaults
             */
            /**
             * @typedef {object} contextMethods
             * @property {import('../src/restSchema/contextMethods/cast')} cast
             * @property {import('../src/restSchema/contextMethods/createResource')} createResource
             * @property {import('../src/restSchema/contextMethods/deleteResource')} deleteResource
             * @property {import('../src/restSchema/contextMethods/findLocationOfInput')} findLocationOfInput
             * @property {import('../src/restSchema/contextMethods/getCollection')} getCollection
             * @property {import('../src/restSchema/contextMethods/getCreateFields')} getCreateFields
             * @property {import('../src/restSchema/contextMethods/getCreateInputs')} getCreateInputs
             * @property {import('../src/restSchema/contextMethods/getCustomFilters')} getCustomFilters
             * @property {import('../src/restSchema/contextMethods/getFields')} getFields
             * @property {import('../src/restSchema/contextMethods/getFilters')} getFilters
             * @property {import('../src/restSchema/contextMethods/getInputs')} getInputs
             * @property {import('../src/restSchema/contextMethods/getInputsFromFields')} getInputsFromFields
             * @property {import('../src/restSchema/contextMethods/getLimit')} getLimit
             * @property {import('../src/restSchema/contextMethods/getMessages')} getMessages
             * @property {import('../src/restSchema/contextMethods/getNestedField')} getNestedField
             * @property {import('../src/restSchema/contextMethods/getNestedInput')} getNestedInput
             * @property {import('../src/restSchema/contextMethods/getPage')} getPage
             * @property {import('../src/restSchema/contextMethods/getRelations')} getRelations
             * @property {import('../src/restSchema/contextMethods/getResource')} getResource
             * @property {import('../src/restSchema/contextMethods/getResourceResponse')} getResourceResponse
             * @property {import('../src/restSchema/contextMethods/getResponseValuesFromResource')} getResponseValuesFromResource
             * @property {import('../src/restSchema/contextMethods/getRouteKeys')} getRouteKeys
             * @property {import('../src/restSchema/contextMethods/getRouteKeysFilters')} getRouteKeysFilters
             * @property {import('../src/restSchema/contextMethods/getRoutes')} getRoutes
             * @property {import('../src/restSchema/contextMethods/getSelectFields')} getSelectFields
             * @property {import('../src/restSchema/contextMethods/getSkip')} getSkip
             * @property {import('../src/restSchema/contextMethods/getSort')} getSort
             * @property {import('../src/restSchema/contextMethods/getTotal')} getTotal
             * @property {import('../src/restSchema/contextMethods/getUpdateFields')} getUpdateFields
             * @property {import('../src/restSchema/contextMethods/getUpdateInputs')} getUpdateInputs
             * @property {import('../src/restSchema/contextMethods/hook')} hook
             * @property {import('../src/restSchema/contextMethods/sanitizeInput')} sanitizeInput
             * @property {import('../src/restSchema/contextMethods/sanitizeInputs')} sanitizeInputs
             * @property {import('../src/restSchema/contextMethods/setPaginationHeaders')} setPaginationHeaders
             * @property {import('../src/restSchema/contextMethods/updateResource')} updateResource
             * @property {import('../src/restSchema/contextMethods/validateInput')} validateInput
             * @property {import('../src/restSchema/contextMethods/validateInputs')} validateInputs
             * @property {import('../src/restSchema/contextMethods/getCollectionResponse')} getCollectionResponse
             * @property {import('../src/restSchema/contextMethods/getDirtyInputs')} getDirtyInputs
             *
             */
            /**
             * @typedef {object} validationError
             * @property {string} field
             * @property {*} value
             * @property {string} message
             * @property {string} location
             *
             * @typedef {Array.<validationError>} validationErrors
             */
            /**
             * @typedef {import("express").Request} request
             * @typedef {import("express").Response} response
             */
            /**
             * @typedef {object} contextProps
             * @property {schema} schema
             * @property {model} model
             * @property {('index' | 'single' | 'get' | 'update' | 'validate' | 'count' | 'delete' | string)} route
             * @property {route} routeObject
             * @property {defaults} defaults
             * @property {object} relationFilters
             * @property {resource} [resource]
             * @property {resource} [updatedResource]
             * @property {resource} [createdResource]
             * @property {resource} [deletedResource]
             * @property {resource} [deletedResource]
             * @property {Array.<resource>} [collection]
             * @property {request & Object.<string , any>} [req]
             * @property {response & Object.<string , any>} [res]
             * @property {function} [next]
             * @property {fields} [fields]
             * @property {object} [response]
             * @property {object} [collectionResponse]
             * @property {object} [inputs]
             * @property {object} [createInputs]
             * @property {object} [updateInputs]
             * @property {string[]} [routeKeys]
             * @property {number} [total]
             * @property {validationErrors} [validationErrors]
             * @property {boolean} [isRelation]
             * @property {context} [parent]
             * @property {object} [dirtyInputs]
             *
             *
             * @typedef {contextProps & contextMethods} context
             */
            setUpdatedResource?: boolean;
            resource?: resource;
            filters?: any;
        }) => Promise<resource>;
        validateInput: ({ value, field, key }: {
            value?: any;
            field: import("typeDefs/field").field;
            key?: string;
        }) => Promise<any>;
        validateInputs: ({ setValidationErrors, fields, inputs, checkRequired }?: {
            setValidationErrors?: boolean;
            fields?: import("typeDefs/field").fields;
            inputs?: any;
            checkRequired?: boolean;
        }) => Promise<any>;
        getCollectionResponse: ({ collection, fields }?: {
            collection?: resource[];
            fields?: import("typeDefs/field").fields;
        }) => Promise<any>;
        getDirtyInputs: ({ setDirtyInputs, force, inputs, resource }?: {
            setDirtyInputs?: boolean;
            inputs?: any;
            resource?: resource;
            force?: boolean;
        }) => Promise<any>;
    };
    export type validationError = {
        field: string;
        value: any;
        message: string;
        location: string;
    };
    export type validationErrors = Array<validationError>;
    export type request = import("node_modules/@types/express/index").Request;
    export type response = import("node_modules/@types/express/index").Response;
    export type contextProps = {
        schema: schema;
        model: model;
        route: ('index' | 'single' | 'get' | 'update' | 'validate' | 'count' | 'delete' | string);
        routeObject: route;
        defaults: defaults;
        relationFilters: object;
        resource?: resource;
        updatedResource?: resource;
        createdResource?: resource;
        deletedResource?: resource;
        collection?: Array<resource>;
        req?: request & {
            [x: string]: any;
        };
        res?: response & {
            [x: string]: any;
        };
        next?: Function;
        fields?: fields;
        response?: object;
        collectionResponse?: object;
        inputs?: object;
        createInputs?: object;
        updateInputs?: object;
        routeKeys?: string[];
        total?: number;
        validationErrors?: validationErrors;
        isRelation?: boolean;
        parent?: context;
        dirtyInputs?: object;
    };
    export type context = contextProps & contextMethods;
}
declare module "src/restSchema/errors/restSchemaError" {
    export = RestSchemaError;
    class RestSchemaError extends Error {
        /**
         *
         * @param {import("../../../typeDefs/context").context} context
         * @param {import("../../../typeDefs/context").request} req
         * @param {import("../../../typeDefs/context").response} res
         */
        handler(context: import("../../../typeDefs/context").context, req: import("../../../typeDefs/context").request, res: import("../../../typeDefs/context").response): import("express").Response<any, Record<string, any>>;
    }
}
declare module "src/restSchema/errors/validationError" {
    export = ValidationError;
    class ValidationError extends RestSchemaError {
        /**
         *
         * @param {string} message
         * @param {import("../../../typeDefs/context").validationErrors} validationData
         */
        constructor(message: string, validationData: import("../../../typeDefs/context").validationErrors);
        validationData: import("typeDefs/context").validationErrors;
    }
    import RestSchemaError = require("src/restSchema/errors/restSchemaError");
}
declare module "src/restSchema/errors/notFoundError" {
    export = NotFoundError;
    class NotFoundError extends RestSchemaError {
    }
    import RestSchemaError = require("src/restSchema/errors/restSchemaError");
}
declare module "src/restSchema/errors/invalidArgumentError" {
    export = InvalidArgumentError;
    class InvalidArgumentError extends RestSchemaError {
    }
    import RestSchemaError = require("src/restSchema/errors/restSchemaError");
}
declare module "src/restSchema/errors/index" {
    import RestSchemaError = require("src/restSchema/errors/restSchemaError");
    import ValidationError = require("src/restSchema/errors/validationError");
    import NotFoundError = require("src/restSchema/errors/notFoundError");
    import InvalidArgumentError = require("src/restSchema/errors/invalidArgumentError");
    export { RestSchemaError, RestSchemaError as Error, ValidationError, NotFoundError, InvalidArgumentError };
}
declare module "src/restSchema/defaults/schema/defaultSchemaRoutes" {
    const _exports: {
        [x: string]: import("typeDefs/route").route;
    };
    export = _exports;
}
declare module "src/restSchema/defaults/schema/defaultSchemaPagination" {
    export const defaultFilters: {};
    export const sort: string;
    export const page: number;
    export const limit: number;
    export const minLimit: number;
    export const maxLimit: number;
    export const skip: number;
}
declare module "src/restSchema/defaults/schema/defaultSchemaWrappers" {
    export function response(response: any, context: any): any;
    export function response(response: any, context: any): any;
    export function error(error: any, context: any, req: any, res: any, next: any): any;
    export function error(error: any, context: any, req: any, res: any, next: any): any;
}
declare module "src/restSchema/defaults/defaultSchema" {
    import fields = require("src/restSchema/defaults/schema/defaultSchemaFields");
    import routes = require("src/restSchema/defaults/schema/defaultSchemaRoutes");
    import pagination = require("src/restSchema/defaults/schema/defaultSchemaPagination");
    import wrappers = require("src/restSchema/defaults/schema/defaultSchemaWrappers");
    export const filters: {};
    export const middleware: {};
    export const routeKeys: string[];
    export const hooks: {};
    export { fields, routes, pagination, wrappers };
}
declare module "src/restSchema/defaults/defaultPluginMiddlewareList" {
    export {};
}
declare module "src/restSchema/defaults/defaultPluginHooks" {
    export {};
}
declare module "src/restSchema/defaults/index" {
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
    const defaults: defaults;
    namespace defaults {
        export { field, messages, route, schema, hooks, middleware, defaults };
    }
    type field = import("typeDefs/field").field;
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
    };
    type route = import("typeDefs/route").route;
    type schema = import("typeDefs/schema").schema;
    type hooks = import("typeDefs/schema").hooks;
    type middleware = import("typeDefs/schema").middleware;
    type defaults = {
        defaultField: field;
        defaultMessages: messages;
        defaultRoute: route;
        defaultSchema: schema;
        defaultPluginMiddlewareList: schema;
        defaultPluginHooks: hooks;
    };
}
declare module "src/restSchema/modelWrappers/mongooseModel" {
    function _exports(model: any): any;
    export = _exports;
}
declare module "src/restSchema/schemaFormatters/modelFormatter" {
    function _exports(model: any): any;
    export = _exports;
}
declare module "src/restSchema/schemaFormatters/nameFormatter" {
    function _exports(schema: any): any;
    export = _exports;
}
declare module "src/restSchema/schemaFormatters/schemaFormatter" {
    function _exports(userSchema: any): any;
    export = _exports;
}
declare module "src/restSchema/addSchemaModel" {
    export function addSchemaModel(schema: any): any;
}
declare module "src/restSchema/schema" {
    export = schemaModelBuilder;
    /**
     * @typedef {import("./schemaBuilder")} schemaBuilder
     * @param {import("../../typeDefs/schema").model} model
     * @param {import("../../typeDefs/field").fields} fields
     * @param {import("../../typeDefs/schema").schema} options
     * @returns {schemaBuilder}
     */
    function schemaModelBuilder(model: import("typeDefs/schema").model, fields: import("typeDefs/field").fields, options?: import("typeDefs/schema").schema): schemaBuilder;
    namespace schemaModelBuilder {
        export { schemaBuilder };
    }
    type schemaBuilder = import("src/restSchema/schemaBuilder");
}
declare module "src/restSchema/enums/index" {
    export { relationType };
    import relationType = require("src/restSchema/enums/relationTypes");
}
declare module "src/restSchema/routeManager" {
    export = RouteManager;
    /**
     * @typedef {import("../../typeDefs/route").routes} routes
     * @typedef {import("../../typeDefs/route").route} route
     */
    class RouteManager {
        /**
         * @param {route[]} [routes]
         */
        constructor(routes?: route[]);
        routes: import("typeDefs/route").route[];
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
    namespace RouteManager {
        export { routes, route };
    }
    type route = import("typeDefs/route").route;
    type routes = import("typeDefs/route").routes;
}
declare module "src/restSchema/middlewareManager" {
    export = MiddlewareManager;
    /**
     * @typedef {import("../../typeDefs/schema").middleware} middleware
     */
    class MiddlewareManager {
        defaultRoutes: string[];
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
    namespace MiddlewareManager {
        export { middleware };
    }
    type middleware = import("typeDefs/schema").middleware;
}
declare module "src/restSchema/index" {
    import use = require("src/restSchema/use");
    import schema = require("src/restSchema/schema");
    import defaults = require("src/restSchema/defaults");
    import RouteManager = require("src/restSchema/routeManager");
    import MiddlewareManager = require("src/restSchema/middlewareManager");
    import set = require("src/restSchema/set");
    import enums = require("src/restSchema/enums");
    import types = require("src/restSchema/types");
    import CustomType = require("src/restSchema/customType");
    import errors = require("src/restSchema/errors");
    export { use, schema, defaults, RouteManager, MiddlewareManager, set, enums, types, CustomType, schema as Schema, schema as Model, schema as model, errors };
}
