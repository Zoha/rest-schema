/// <reference types="mongoose" />
export type schema = import("./schema").schema;
export type fields = import("./field").fields;
export type resourceDocument = import("mongoose").Document;
export type resource = resourceDocument & {
    [x: string]: any;
};
export type modelDocument = import("mongoose").Model<any, any>;
export type model = import("mongoose").Model<any, any> & {
    [x: string]: any;
};
export type route = import("./route").route;
export type defaultDefaults = import("../src/restSchema/defaults").defaults;
export type defaults = defaultDefaults & {
    [x: string]: any;
};
export type paginationProps = import("./schema").paginationProps;
export type contextMethods = {
    cast: (value: any, type?: any) => import("../src/restSchema/helpers/cast").RSConvertTo;
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
         * @typedef {import("./schema").paginationProps} paginationProps
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
         * @property {import('../src/restSchema/contextMethods/getPaginationData')} getPaginationData
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
         * @property {paginationProps} [pagination]
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
         * @typedef {import("./schema").paginationProps} paginationProps
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
         * @property {import('../src/restSchema/contextMethods/getPaginationData')} getPaginationData
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
         * @property {paginationProps} [pagination]
         *
         *
         * @typedef {contextProps & contextMethods} context
         */
        sort?: any;
        filtersMeta?: any;
    }) => Promise<resource[]>;
    getCreateFields: ({ fields }?: {
        fields?: import("./field").fields;
    }) => Promise<import("./field").fields>;
    getCreateInputs: ({ setCreateInputs, fields, inputs }?: {
        setCreateInputs?: boolean;
        fields?: import("./field").fields;
        inputs?: any;
    }) => Promise<any>;
    getCustomFilters: ({ filters, relationFilters }?: {
        filters?: any;
        route?: string;
        routes?: import("../src/restSchema/contextMethods/getCustomFilters").routes;
        relationFilters?: any;
    }) => Promise<any>;
    getFields: ({ setFields, fields }?: {
        setFields?: boolean;
        fields?: import("./field").fields;
    }) => Promise<import("./field").fields>;
    getFilters: ({ inputs, operators, defaultRouteFilters, customFilters, filteringMeta, pagination }?: {
        inputs?: any;
        operators?: import("./route").filteringOperators;
        defaultRouteFilters?: any;
        customFilters?: any;
        filteringMeta?: any;
        pagination?: import("./schema").paginationProps;
    }) => Promise<any>;
    getInputs: ({ setInputs, req, inputsTarget, force }?: {
        setInputs?: boolean;
        req?: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
        inputsTarget?: string[];
        force?: boolean;
    }) => Promise<any>;
    getInputsFromFields: ({ fields, inputs }?: {
        fields?: import("./field").fields;
        inputs?: any;
    }) => Promise<any>;
    getLimit: ({ defaultLimit, maxLimit, minLimit, limitKey, inputs, pagination }?: {
        defaultLimit?: number;
        maxLimit?: number;
        minLimit?: number;
        limitKey?: string;
        inputs?: any;
        pagination?: import("./schema").paginationProps;
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
             * @typedef {import("./schema").paginationProps} paginationProps
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
             * @property {import('../src/restSchema/contextMethods/getPaginationData')} getPaginationData
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
             * @property {paginationProps} [pagination]
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
        fields?: import("./field").fields;
    }) => Promise<import("./field").field>;
    getNestedInput: ({ key, inputs }: {
        key: string;
        inputs?: any;
    }) => Promise<any>;
    getPage: ({ skip, limit }?: {
        skip?: number;
        limit?: number;
    }) => Promise<number>;
    getPaginationData: ({ pagination, setResource, force }?: any) => Promise<any>;
    getRelations: ({ fields }?: {
        fields?: import("./field").fields;
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
        fields?: import("./field").fields;
        resource?: resource;
        selectFields?: import("./field").fields;
    }) => Promise<any>;
    getRouteKeys: () => string[];
    getRouteKeysFilters: ({ routeKeys, req, id, idKey, idTarget, fallbackFilters }?: {
        routeKeys?: string[];
        req?: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
        id?: any;
        idKey?: string;
        idTarget?: string;
        fallbackFilters?: any;
    }) => Promise<any[]>;
    getRoutes: () => import("./route").routes;
    getSelectFields: ({ resource, fields, selectInputKey, inputs, routeObject, selectable }?: {
        resource?: resource;
        fields?: import("./field").fields;
        selectInputKey?: string;
        inputs?: any;
        routeObject?: import("./route").route;
        selectable?: boolean;
    }) => Promise<import("./field").fields>;
    getSkip: ({ skip, inputs, skipInputKey, page, pageInputKey, defaultPage, limit, pagination }?: {
        skip?: number;
        inputs?: any;
        skipInputKey?: string;
        page?: number;
        pageInputKey?: string;
        defaultPage?: number;
        limit?: number;
        pagination?: import("./schema").paginationProps;
    }) => Promise<number>;
    getSort: ({ inputs, sortKey, defaultSort, sortString, pagination }?: {
        sortKey?: string;
        inputs?: any;
        defaultSort?: any;
        sortString?: string;
        pagination?: import("./schema").paginationProps;
    }) => Promise<any>;
    getTotal: ({ setTotal, filters }?: {
        setTotal?: boolean;
        filters?: any;
    }) => Promise<number>;
    getUpdateFields: ({ fields }?: {
        fields?: import("./field").fields;
    }) => Promise<import("./field").fields>;
    getUpdateInputs: ({ setUpdateInputs, updateFields }?: {
        setUpdateInputs?: boolean;
        updateFields?: import("./field").fields;
    }) => Promise<any>;
    hook: (hook: string) => Promise<any>;
    sanitizeInput: ({ value, field }: {
        value: any;
        field: import("./field").field;
    }) => Promise<any>;
    sanitizeInputs: ({ setInputs, fields, inputs, setDirtyInputs }?: {
        setInputs?: boolean;
        fields?: import("./field").fields;
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
         * @typedef {import("./schema").paginationProps} paginationProps
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
         * @property {import('../src/restSchema/contextMethods/getPaginationData')} getPaginationData
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
         * @property {paginationProps} [pagination]
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
    updateResource: ({ setResource, setUpdatedResource, resource, filters, inputs }?: {
        setResource?: boolean; /**
         * @typedef {import("../src/restSchema/defaults").defaults} defaultDefaults
         * @typedef {defaultDefaults & Object<string , *>} defaults
         */
        /**
         * @typedef {import("./schema").paginationProps} paginationProps
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
         * @property {import('../src/restSchema/contextMethods/getPaginationData')} getPaginationData
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
         * @property {paginationProps} [pagination]
         *
         *
         * @typedef {contextProps & contextMethods} context
         */
        setUpdatedResource?: boolean;
        resource?: resource;
        filters?: any;
        inputs?: any;
    }) => Promise<resource>;
    validateInput: ({ value, field, key }: {
        value?: any;
        field: import("./field").field;
        key?: string;
    }) => Promise<any>;
    validateInputs: ({ setValidationErrors, fields, inputs, checkRequired }?: {
        setValidationErrors?: boolean;
        fields?: import("./field").fields;
        inputs?: any;
        checkRequired?: boolean;
    }) => Promise<any>;
    getCollectionResponse: ({ collection, fields }?: {
        collection?: resource[];
        fields?: import("./field").fields;
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
export type request = import("express").Request;
export type response = import("express").Response;
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
    pagination?: paginationProps;
};
export type context = contextProps & contextMethods;
