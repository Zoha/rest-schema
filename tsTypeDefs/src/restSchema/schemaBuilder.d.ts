export = SchemaBuilder;
/**
 * @typedef {import("express").Request} request
 * @typedef {import("express").Response} response
 * @typedef {import("../../typeDefs/context").context} context
 */
declare class SchemaBuilder {
    /**
     *
     * @param {import("../../typeDefs/schema").schema} schema
     */
    constructor(schema: import("../../typeDefs/schema").schema);
    defaults: any;
    schema: import("../../typeDefs/schema").schema;
    name: string;
    collectionName: string;
    tempContext: {
        schema: import("../../typeDefs/schema").schema;
        model: import("../../typeDefs/context").model;
        route: string;
        routeObject: import("../../typeDefs/route").route;
        defaults: import("../../typeDefs/context").defaults;
        relationFilters: any;
        resource?: import("../../typeDefs/context").resource;
        updatedResource?: import("../../typeDefs/context").resource;
        createdResource?: import("../../typeDefs/context").resource;
        deletedResource?: import("../../typeDefs/context").resource;
        collection?: import("../../typeDefs/context").resource[];
        relationDepth?: number;
        req: (express.Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>> & {
            [x: string]: any;
        }) | (express.Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>> & {
            [x: string]: any;
        });
        res: (express.Response<any, Record<string, any>> & {
            [x: string]: any;
        }) | (express.Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>> & {
            [x: string]: any;
        });
        next?: Function;
        fields?: import("../../typeDefs/field").fields;
        response?: any;
        collectionResponse?: any;
        inputs?: any;
        createInputs?: any;
        updateInputs?: any;
        routeKeys?: string[];
        total?: number;
        validationErrors?: import("../../typeDefs/context").validationErrors;
        isRelation?: boolean;
        relation?: import("./contextMethods/getRelations").relationObj;
        parent?: import("../../typeDefs/context").context;
        dirtyInputs?: any;
        pagination?: import("../../typeDefs/schema").paginationProps;
        dynamicFilters?: any;
        loadRelations?: import("./contextMethods/getRelations").relationObj[];
        search?: string;
        cast: (value: any, type?: any) => import("./helpers/cast").RSConvertTo;
        createResource: ({ setResource, setCreatedResource, inputs }?: {
            setResource?: boolean;
            setCreatedResource?: boolean;
            inputs?: any;
        }) => Promise<import("../../typeDefs/context").resource>;
        deleteResource: ({ setDeletedResource, resource, filters }?: {
            setDeletedResource?: boolean;
            resource?: import("../../typeDefs/context").resource;
            filters?: boolean;
        }) => Promise<import("../../typeDefs/context").resource>;
        findLocationOfInput: ({ key, req, inputsTargets }: {
            key: string;
            req?: string;
            inputsTargets?: string;
        }) => Promise<import("../../typeDefs/context").resource>;
        getAggregateCollection: ({ setCollection, force, filters, skip, limit, sort, search, sortRelations, filterRelations }?: {
            setCollection?: boolean;
            force?: boolean;
            filters?: any;
            skip?: number;
            limit?: number;
            sort?: any;
            search?: string;
            sortRelations?: import("./contextMethods/getRelations").relationObj[];
            filterRelations?: import("./contextMethods/getRelations").relationObj[];
        }) => Promise<import("../../typeDefs/context").resource[]>;
        getAggregateResource: ({ errorOnNotFound, setResource, force, filters, resourceId }?: {
            errorOnNotFound?: boolean;
            setResource?: boolean;
            force?: boolean;
            filters?: any;
            resourceId?: any;
        }) => Promise<import("../../typeDefs/context").resource[]>;
        getCollection: ({ setCollection, force, filters, skip, limit, sort, filtersMeta, canUseAggregate, search }?: {
            setCollection?: boolean;
            force?: boolean;
            filters?: any;
            skip?: number;
            limit?: number;
            sort?: any;
            filtersMeta?: any;
            canUseAggregate?: boolean;
            search?: string;
        }) => Promise<import("../../typeDefs/context").resource[]>;
        getCreateFields: ({ fields }?: {
            fields?: import("../../typeDefs/field").fields;
        }) => Promise<import("../../typeDefs/field").fields>;
        getCreateInputs: ({ setCreateInputs, fields, inputs }?: {
            setCreateInputs?: boolean;
            fields?: import("../../typeDefs/field").fields;
            inputs?: any;
        }) => Promise<any>;
        getCustomFilters: ({ filters, relationFilters, dynamicFilters, routeFilters }?: {
            filters?: any;
            relationFilters?: any;
            dynamicFilters?: any;
            /**
             * @typedef {import("express").Request} request
             * @typedef {import("express").Response} response
             * @typedef {import("../../typeDefs/context").context} context
             */
            routeFilters?: any;
        }) => Promise<any>;
        getFields: ({ setFields, fields }?: {
            setFields?: boolean;
            fields?: import("../../typeDefs/field").fields;
        }) => Promise<import("../../typeDefs/field").fields>;
        getFilters: ({ inputs, operators, defaultRouteFilters, customFilters, filteringMeta, pagination, includeRelationFilters, includeRelationsInResult }?: {
            inputs?: any;
            operators?: import("../../typeDefs/route").filteringOperators;
            defaultRouteFilters?: any;
            customFilters?: any;
            filteringMeta?: any;
            pagination?: import("../../typeDefs/schema").paginationProps;
            includeRelationFilters?: false;
            includeRelationsInResult?: boolean;
        }) => Promise<any>;
        getInputs: ({ setInputs, req, inputsTarget, force }?: {
            setInputs?: boolean;
            req?: express.Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            inputsTarget?: string[];
            force?: boolean;
        }) => Promise<any>;
        getInputsFromFields: ({ fields, inputs }?: {
            fields?: import("../../typeDefs/field").fields;
            inputs?: any;
        }) => Promise<any>;
        getLimit: ({ defaultLimit, maxLimit, minLimit, limitKey, inputs, pagination }?: {
            defaultLimit?: number;
            maxLimit?: number;
            minLimit?: number;
            limitKey?: string;
            inputs?: any;
            pagination?: import("../../typeDefs/schema").paginationProps;
        }) => Promise<number>;
        getLoadRelations: ({ setLoadRelations, inputs, loadKey, force, relations, loads }?: {
            setLoadRelations?: boolean;
            inputs?: any;
            loadKey?: string;
            force?: boolean;
            relations?: import("./contextMethods/getRelations").relationObj[];
            loads?: string | string[];
        }) => Promise<import("./contextMethods/getRelations").relationObj[]>;
        getMessages: () => {
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
            maximumRelationDepth: string;
        };
        getNestedField: ({ key, fields }: {
            key: string;
            fields?: import("../../typeDefs/field").fields;
        }) => Promise<import("../../typeDefs/field").field>;
        getNestedInput: ({ key, inputs }: {
            key: string;
            inputs?: any;
        }) => Promise<any>;
        getPage: ({ skip, limit }?: {
            skip?: number;
            limit?: number;
        }) => Promise<number>;
        getPaginationData: ({ pagination, setResource, force }?: any) => Promise<any>;
        getRelations: ({ fields, setRelations, force }?: {
            fields?: import("../../typeDefs/field").fields;
            setRelations?: boolean;
            force?: boolean;
        }) => Promise<import("./contextMethods/getRelations").relationObj[]>;
        getResource: ({ errorOnNotFound, setResource, force, resourceId, model, filters, canUseAggregate }?: {
            errorOnNotFound?: boolean;
            setResource?: boolean;
            force?: boolean;
            resourceId?: any;
            model?: import("../../typeDefs/context").model;
            filters?: any;
            canUseAggregate?: boolean;
        }) => Promise<import("../../typeDefs/context").resource>;
        getResourceResponse: ({ resource }?: {
            resource?: import("../../typeDefs/context").resource;
        }) => Promise<any>;
        getResponseValuesFromResource: ({ fields, resource, selectFields }?: {
            fields?: import("../../typeDefs/field").fields;
            resource?: import("../../typeDefs/context").resource;
            selectFields?: import("../../typeDefs/field").fields;
        }) => Promise<any>;
        getRouteKeys: () => string[];
        getRouteKeysFilters: ({ routeKeys, req, id, idKey, idTarget, fallbackFilters }?: {
            routeKeys?: string[];
            req?: express.Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            id?: any;
            idKey?: string;
            idTarget?: string;
            fallbackFilters?: any;
        }) => Promise<any[]>;
        getRoutes: () => import("../../typeDefs/route").routes;
        getSearch: ({ setSearch, inputs, searchKey }?: {
            setSearch?: boolean;
            inputs?: any;
            searchKey?: string;
        }) => Promise<number>;
        getSelectFields: ({ resource, fields, selectInputKey, inputs, routeObject, selectable, loadRelations }?: {
            resource?: import("../../typeDefs/context").resource;
            fields?: import("../../typeDefs/field").fields;
            selectInputKey?: string;
            inputs?: any;
            routeObject?: import("../../typeDefs/route").route;
            selectable?: boolean;
            loadRelations?: import("./contextMethods/getRelations").relationObj[];
        }) => Promise<import("../../typeDefs/field").fields>;
        getSkip: ({ skip, inputs, skipInputKey, page, pageInputKey, defaultPage, limit, pagination }?: {
            skip?: number;
            inputs?: any;
            skipInputKey?: string;
            page?: number;
            pageInputKey?: string;
            defaultPage?: number;
            limit?: number;
            pagination?: import("../../typeDefs/schema").paginationProps;
        }) => Promise<number>;
        getSort: ({ inputs, sortKey, defaultSort, sortString, pagination, includeRelationSorts, includeRelationsInResult }?: {
            sortKey?: string;
            inputs?: any;
            defaultSort?: any;
            sortString?: string;
            pagination?: import("../../typeDefs/schema").paginationProps;
            includeRelationSorts?: boolean;
            includeRelationsInResult?: boolean;
        }) => Promise<any>;
        getTotal: ({ setTotal, filters, force }?: {
            setTotal?: boolean;
            filters?: any;
            force?: boolean;
        }) => Promise<number>;
        getUpdateFields: ({ fields }?: {
            fields?: import("../../typeDefs/field").fields;
        }) => Promise<import("../../typeDefs/field").fields>;
        getUpdateInputs: ({ setUpdateInputs, updateFields }?: {
            setUpdateInputs?: boolean;
            updateFields?: import("../../typeDefs/field").fields;
        }) => Promise<any>;
        hook: (hook: string) => Promise<any>;
        sanitizeInput: ({ value, field }: {
            value: any;
            field: import("../../typeDefs/field").field;
        }) => Promise<any>;
        sanitizeInputs: ({ setInputs, fields, inputs, setDirtyInputs }?: {
            setInputs?: boolean;
            fields?: import("../../typeDefs/field").fields;
            inputs?: any;
            setDirtyInputs?: boolean;
        }) => Promise<any>;
        setMeta: ({ filters, sort, limit, select, page, skip, inputs, setInputs, force, route }?: {
            filters?: any;
            sort?: number;
            limit?: number;
            select?: string;
            page?: number;
            skip?: number;
            inputs?: any;
            setInputs?: boolean;
            force?: boolean;
            route?: any;
        }) => Promise<any>;
        setPaginationHeaders: ({ res, total, collection, count, skip, limit, page, start, end, range, hasPrevPage, hasNextPage, prevPage, nextPage, lastPage }?: {
            res?: express.Response<any, Record<string, any>>;
            total?: number;
            collection?: import("../../typeDefs/context").resource[];
            /**
             * @typedef {import("express").Request} request
             * @typedef {import("express").Response} response
             * @typedef {import("../../typeDefs/context").context} context
             */
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
            setResource?: boolean;
            setUpdatedResource?: boolean; /**
             * @typedef {import("express").Request} request
             * @typedef {import("express").Response} response
             * @typedef {import("../../typeDefs/context").context} context
             */
            resource?: import("../../typeDefs/context").resource;
            filters?: any;
            inputs?: any;
        }) => Promise<import("../../typeDefs/context").resource>;
        validateInput: ({ value, field, key }: {
            value?: any;
            field: import("../../typeDefs/field").field;
            key?: string;
        }) => Promise<any>;
        validateInputs: ({ setValidationErrors, fields, inputs, checkRequired }?: {
            setValidationErrors?: boolean;
            fields?: import("../../typeDefs/field").fields;
            inputs?: any;
            checkRequired?: boolean;
        }) => Promise<any>;
        getCollectionResponse: ({ collection, fields }?: {
            collection?: import("../../typeDefs/context").resource[];
            fields?: import("../../typeDefs/field").fields;
        }) => Promise<any>;
        getDirtyInputs: ({ setDirtyInputs, force, inputs, resource }?: {
            setDirtyInputs?: boolean;
            inputs?: any;
            resource?: import("../../typeDefs/context").resource;
            force?: boolean;
        }) => Promise<any>;
    };
    resource(): import("express-serve-static-core").Router;
    /**
     *
     * @param {request & Object.<string , any>} [req]
     * @param {request & Object.<string , any>} [res]
     * @param {Partial<import("../../typeDefs/context").context>} [otherProps]
     * @param {import("../../typeDefs/route").route} [route]
     * @returns
     */
    createTempContext(req?: request & {
        [x: string]: any;
    }, res?: request & {
        [x: string]: any;
    }, otherProps?: Partial<import("../../typeDefs/context").context>, route?: import("../../typeDefs/route").route): {
        schema: import("../../typeDefs/schema").schema;
        model: import("../../typeDefs/context").model;
        route: string;
        routeObject: import("../../typeDefs/route").route;
        defaults: import("../../typeDefs/context").defaults;
        relationFilters: any;
        resource?: import("../../typeDefs/context").resource;
        updatedResource?: import("../../typeDefs/context").resource;
        createdResource?: import("../../typeDefs/context").resource;
        deletedResource?: import("../../typeDefs/context").resource;
        collection?: import("../../typeDefs/context").resource[];
        relationDepth?: number;
        req: (express.Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>> & {
            [x: string]: any;
        }) | (express.Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>> & {
            [x: string]: any;
        });
        res: (express.Response<any, Record<string, any>> & {
            [x: string]: any;
        }) | (express.Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>> & {
            [x: string]: any;
        });
        next?: Function;
        fields?: import("../../typeDefs/field").fields;
        response?: any;
        collectionResponse?: any;
        inputs?: any;
        createInputs?: any;
        updateInputs?: any;
        routeKeys?: string[];
        total?: number;
        validationErrors?: import("../../typeDefs/context").validationErrors;
        isRelation?: boolean;
        relation?: import("./contextMethods/getRelations").relationObj;
        parent?: import("../../typeDefs/context").context;
        dirtyInputs?: any;
        pagination?: import("../../typeDefs/schema").paginationProps;
        dynamicFilters?: any;
        loadRelations?: import("./contextMethods/getRelations").relationObj[];
        search?: string;
        cast: (value: any, type?: any) => import("./helpers/cast").RSConvertTo;
        createResource: ({ setResource, setCreatedResource, inputs }?: {
            setResource?: boolean;
            setCreatedResource?: boolean;
            inputs?: any;
        }) => Promise<import("../../typeDefs/context").resource>;
        deleteResource: ({ setDeletedResource, resource, filters }?: {
            setDeletedResource?: boolean;
            resource?: import("../../typeDefs/context").resource;
            filters?: boolean;
        }) => Promise<import("../../typeDefs/context").resource>;
        findLocationOfInput: ({ key, req, inputsTargets }: {
            key: string;
            req?: string;
            inputsTargets?: string;
        }) => Promise<import("../../typeDefs/context").resource>;
        getAggregateCollection: ({ setCollection, force, filters, skip, limit, sort, search, sortRelations, filterRelations }?: {
            setCollection?: boolean;
            force?: boolean;
            filters?: any;
            skip?: number;
            limit?: number;
            sort?: any;
            search?: string;
            sortRelations?: import("./contextMethods/getRelations").relationObj[];
            filterRelations?: import("./contextMethods/getRelations").relationObj[];
        }) => Promise<import("../../typeDefs/context").resource[]>;
        getAggregateResource: ({ errorOnNotFound, setResource, force, filters, resourceId }?: {
            errorOnNotFound?: boolean;
            setResource?: boolean;
            force?: boolean;
            filters?: any;
            resourceId?: any;
        }) => Promise<import("../../typeDefs/context").resource[]>;
        getCollection: ({ setCollection, force, filters, skip, limit, sort, filtersMeta, canUseAggregate, search }?: {
            setCollection?: boolean;
            force?: boolean;
            filters?: any;
            skip?: number;
            limit?: number;
            sort?: any;
            filtersMeta?: any;
            canUseAggregate?: boolean;
            search?: string;
        }) => Promise<import("../../typeDefs/context").resource[]>;
        getCreateFields: ({ fields }?: {
            fields?: import("../../typeDefs/field").fields;
        }) => Promise<import("../../typeDefs/field").fields>;
        getCreateInputs: ({ setCreateInputs, fields, inputs }?: {
            setCreateInputs?: boolean;
            fields?: import("../../typeDefs/field").fields;
            inputs?: any;
        }) => Promise<any>;
        getCustomFilters: ({ filters, relationFilters, dynamicFilters, routeFilters }?: {
            filters?: any;
            relationFilters?: any;
            dynamicFilters?: any;
            /**
             * @typedef {import("express").Request} request
             * @typedef {import("express").Response} response
             * @typedef {import("../../typeDefs/context").context} context
             */
            routeFilters?: any;
        }) => Promise<any>;
        getFields: ({ setFields, fields }?: {
            setFields?: boolean;
            fields?: import("../../typeDefs/field").fields;
        }) => Promise<import("../../typeDefs/field").fields>;
        getFilters: ({ inputs, operators, defaultRouteFilters, customFilters, filteringMeta, pagination, includeRelationFilters, includeRelationsInResult }?: {
            inputs?: any;
            operators?: import("../../typeDefs/route").filteringOperators;
            defaultRouteFilters?: any;
            customFilters?: any;
            filteringMeta?: any;
            pagination?: import("../../typeDefs/schema").paginationProps;
            includeRelationFilters?: false;
            includeRelationsInResult?: boolean;
        }) => Promise<any>;
        getInputs: ({ setInputs, req, inputsTarget, force }?: {
            setInputs?: boolean;
            req?: express.Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            inputsTarget?: string[];
            force?: boolean;
        }) => Promise<any>;
        getInputsFromFields: ({ fields, inputs }?: {
            fields?: import("../../typeDefs/field").fields;
            inputs?: any;
        }) => Promise<any>;
        getLimit: ({ defaultLimit, maxLimit, minLimit, limitKey, inputs, pagination }?: {
            defaultLimit?: number;
            maxLimit?: number;
            minLimit?: number;
            limitKey?: string;
            inputs?: any;
            pagination?: import("../../typeDefs/schema").paginationProps;
        }) => Promise<number>;
        getLoadRelations: ({ setLoadRelations, inputs, loadKey, force, relations, loads }?: {
            setLoadRelations?: boolean;
            inputs?: any;
            loadKey?: string;
            force?: boolean;
            relations?: import("./contextMethods/getRelations").relationObj[];
            loads?: string | string[];
        }) => Promise<import("./contextMethods/getRelations").relationObj[]>;
        getMessages: () => {
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
            maximumRelationDepth: string;
        };
        getNestedField: ({ key, fields }: {
            key: string;
            fields?: import("../../typeDefs/field").fields;
        }) => Promise<import("../../typeDefs/field").field>;
        getNestedInput: ({ key, inputs }: {
            key: string;
            inputs?: any;
        }) => Promise<any>;
        getPage: ({ skip, limit }?: {
            skip?: number;
            limit?: number;
        }) => Promise<number>;
        getPaginationData: ({ pagination, setResource, force }?: any) => Promise<any>;
        getRelations: ({ fields, setRelations, force }?: {
            fields?: import("../../typeDefs/field").fields;
            setRelations?: boolean;
            force?: boolean;
        }) => Promise<import("./contextMethods/getRelations").relationObj[]>;
        getResource: ({ errorOnNotFound, setResource, force, resourceId, model, filters, canUseAggregate }?: {
            errorOnNotFound?: boolean;
            setResource?: boolean;
            force?: boolean;
            resourceId?: any;
            model?: import("../../typeDefs/context").model;
            filters?: any;
            canUseAggregate?: boolean;
        }) => Promise<import("../../typeDefs/context").resource>;
        getResourceResponse: ({ resource }?: {
            resource?: import("../../typeDefs/context").resource;
        }) => Promise<any>;
        getResponseValuesFromResource: ({ fields, resource, selectFields }?: {
            fields?: import("../../typeDefs/field").fields;
            resource?: import("../../typeDefs/context").resource;
            selectFields?: import("../../typeDefs/field").fields;
        }) => Promise<any>;
        getRouteKeys: () => string[];
        getRouteKeysFilters: ({ routeKeys, req, id, idKey, idTarget, fallbackFilters }?: {
            routeKeys?: string[];
            req?: express.Request<import("express-serve-static-core").ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            id?: any;
            idKey?: string;
            idTarget?: string;
            fallbackFilters?: any;
        }) => Promise<any[]>;
        getRoutes: () => import("../../typeDefs/route").routes;
        getSearch: ({ setSearch, inputs, searchKey }?: {
            setSearch?: boolean;
            inputs?: any;
            searchKey?: string;
        }) => Promise<number>;
        getSelectFields: ({ resource, fields, selectInputKey, inputs, routeObject, selectable, loadRelations }?: {
            resource?: import("../../typeDefs/context").resource;
            fields?: import("../../typeDefs/field").fields;
            selectInputKey?: string;
            inputs?: any;
            routeObject?: import("../../typeDefs/route").route;
            selectable?: boolean;
            loadRelations?: import("./contextMethods/getRelations").relationObj[];
        }) => Promise<import("../../typeDefs/field").fields>;
        getSkip: ({ skip, inputs, skipInputKey, page, pageInputKey, defaultPage, limit, pagination }?: {
            skip?: number;
            inputs?: any;
            skipInputKey?: string;
            page?: number;
            pageInputKey?: string;
            defaultPage?: number;
            limit?: number;
            pagination?: import("../../typeDefs/schema").paginationProps;
        }) => Promise<number>;
        getSort: ({ inputs, sortKey, defaultSort, sortString, pagination, includeRelationSorts, includeRelationsInResult }?: {
            sortKey?: string;
            inputs?: any;
            defaultSort?: any;
            sortString?: string;
            pagination?: import("../../typeDefs/schema").paginationProps;
            includeRelationSorts?: boolean;
            includeRelationsInResult?: boolean;
        }) => Promise<any>;
        getTotal: ({ setTotal, filters, force }?: {
            setTotal?: boolean;
            filters?: any;
            force?: boolean;
        }) => Promise<number>;
        getUpdateFields: ({ fields }?: {
            fields?: import("../../typeDefs/field").fields;
        }) => Promise<import("../../typeDefs/field").fields>;
        getUpdateInputs: ({ setUpdateInputs, updateFields }?: {
            setUpdateInputs?: boolean;
            updateFields?: import("../../typeDefs/field").fields;
        }) => Promise<any>;
        hook: (hook: string) => Promise<any>;
        sanitizeInput: ({ value, field }: {
            value: any;
            field: import("../../typeDefs/field").field;
        }) => Promise<any>;
        sanitizeInputs: ({ setInputs, fields, inputs, setDirtyInputs }?: {
            setInputs?: boolean;
            fields?: import("../../typeDefs/field").fields;
            inputs?: any;
            setDirtyInputs?: boolean;
        }) => Promise<any>;
        setMeta: ({ filters, sort, limit, select, page, skip, inputs, setInputs, force, route }?: {
            filters?: any;
            sort?: number;
            limit?: number;
            select?: string;
            page?: number;
            skip?: number;
            inputs?: any;
            setInputs?: boolean;
            force?: boolean;
            route?: any;
        }) => Promise<any>;
        setPaginationHeaders: ({ res, total, collection, count, skip, limit, page, start, end, range, hasPrevPage, hasNextPage, prevPage, nextPage, lastPage }?: {
            res?: express.Response<any, Record<string, any>>;
            total?: number;
            collection?: import("../../typeDefs/context").resource[];
            /**
             * @typedef {import("express").Request} request
             * @typedef {import("express").Response} response
             * @typedef {import("../../typeDefs/context").context} context
             */
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
            setResource?: boolean;
            setUpdatedResource?: boolean; /**
             * @typedef {import("express").Request} request
             * @typedef {import("express").Response} response
             * @typedef {import("../../typeDefs/context").context} context
             */
            resource?: import("../../typeDefs/context").resource;
            filters?: any;
            inputs?: any;
        }) => Promise<import("../../typeDefs/context").resource>;
        validateInput: ({ value, field, key }: {
            value?: any;
            field: import("../../typeDefs/field").field;
            key?: string;
        }) => Promise<any>;
        validateInputs: ({ setValidationErrors, fields, inputs, checkRequired }?: {
            setValidationErrors?: boolean;
            fields?: import("../../typeDefs/field").fields;
            inputs?: any;
            checkRequired?: boolean;
        }) => Promise<any>;
        getCollectionResponse: ({ collection, fields }?: {
            collection?: import("../../typeDefs/context").resource[];
            fields?: import("../../typeDefs/field").fields;
        }) => Promise<any>;
        getDirtyInputs: ({ setDirtyInputs, force, inputs, resource }?: {
            setDirtyInputs?: boolean;
            inputs?: any;
            resource?: import("../../typeDefs/context").resource;
            force?: boolean;
        }) => Promise<any>;
    };
    /**
     *
     * @param {context} parentContext
     * @param {import("./contextMethods/getRelations").relationObj} relation
     * @param {request & Object.<string , any>} [req]
     * @param {request & Object.<string , any>} [res]
     * @param {import("../../typeDefs/route").route} [relationRoute]
     * @param {number} [relationDepth = 1]
     * @param {Partial<import("../../typeDefs/context").context>} otherProps
     * @returns {context}
     */
    createRelationContext(parentContext: context, relation: import("./contextMethods/getRelations").relationObj, req?: request & {
        [x: string]: any;
    }, res?: request & {
        [x: string]: any;
    }, relationRoute?: import("../../typeDefs/route").route, relationDepth?: number, otherProps?: Partial<import("../../typeDefs/context").context>): context;
    use(callback: any): any;
    /**
     * @typedef {import("./schemaBuilder")} schemaBuilder
     * @param {import("../../typeDefs/schema").model} model
     * @param {import("../../typeDefs/field").fields} fields
     * @param {import("../../typeDefs/schema").schema} options
     * @returns {schemaBuilder}
     */
    extend(model: import("../../typeDefs/schema").model, fields: import("../../typeDefs/field").fields, schema: any): SchemaBuilder;
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
declare namespace SchemaBuilder {
    export { request, response, context };
}
import express = require("express");
type request = import("express").Request;
type context = import("../../typeDefs/context").context;
type response = import("express").Response;
