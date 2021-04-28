declare function _exports(schema: import("../../typeDefs/schema").schema, route: import("../../typeDefs/route").route): import("../../typeDefs/context").context;
declare namespace _exports {
    export { methods as contextMethods };
}
export = _exports;
declare namespace methods {
    function cast(value: any, type?: any): import("./helpers/cast").RSConvertTo;
    function createResource({ setResource, setCreatedResource, inputs }?: {
        setResource?: boolean;
        setCreatedResource?: boolean;
        inputs?: any;
    }): Promise<any>;
    function deleteResource({ setDeletedResource, resource, filters }?: {
        setDeletedResource?: boolean;
        resource?: any;
        filters?: boolean;
    }): Promise<any>;
    function findLocationOfInput({ key, req, inputsTargets }: {
        key: string;
        req?: string;
        inputsTargets?: string;
    }): Promise<any>;
    function getCollection({ setCollection, force, filters, skip, limit, sort, filtersMeta }?: {
        setCollection?: boolean;
        force?: boolean;
        filters?: any;
        skip?: number;
        limit?: number;
        sort?: any;
        filtersMeta?: any;
    }): Promise<any[]>;
    function getCreateFields({ fields }?: {
        fields?: import("../../typeDefs/field").fields;
    }): Promise<import("../../typeDefs/field").fields>;
    function getCreateInputs({ setCreateInputs, fields, inputs }?: {
        setCreateInputs?: boolean;
        fields?: import("../../typeDefs/field").fields;
        inputs?: any;
    }): Promise<any>;
    function getCustomFilters({ filters, route, routes, relationFilters }?: {
        filters?: any;
        route?: string;
        routes?: import("./contextMethods/getCustomFilters").routes;
        relationFilters?: any;
    }): Promise<any>;
    function getFields({ setFields, fields }?: {
        setFields?: boolean;
        fields?: import("../../typeDefs/field").fields;
    }): Promise<import("../../typeDefs/field").fields>;
    function getFilters({ inputs, operators, defaultRouteFilters, customFilters, filteringMeta }?: {
        inputs?: any;
        operators?: import("../../typeDefs/route").filteringOperators;
        defaultRouteFilters?: any;
        customFilters?: any;
        filteringMeta?: any;
    }): Promise<any>;
    function getInputs({ setInputs, req, inputsTarget, force }?: {
        setInputs?: boolean;
        req?: any;
        inputsTarget?: string[];
        force?: boolean;
    }): Promise<any>;
    function getInputsFromFields({ fields, inputs }?: {
        fields?: import("../../typeDefs/field").fields;
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
        fields?: import("../../typeDefs/field").fields;
    }): Promise<import("../../typeDefs/field").field>;
    function getNestedInput({ key, inputs }: {
        key: string;
        inputs?: any;
    }): Promise<any>;
    function getPage({ skip, limit }?: {
        skip?: number;
        limit?: number;
    }): Promise<number>;
    function getRelations({ fields }?: {
        fields?: import("../../typeDefs/field").fields;
    }): Promise<any>;
    function getResource({ errorOnNotFound, setResource, force, resourceId, model, filters }?: {
        errorOnNotFound?: boolean;
        setResource?: boolean;
        force?: boolean;
        resourceId?: any;
        model?: any;
        filters?: any;
    }): Promise<any>;
    function getResourceResponse({ resource }?: {
        resource?: any;
    }): Promise<any>;
    function getResponseValuesFromResource({ fields, resource, selectFields }?: {
        fields?: import("../../typeDefs/field").fields;
        resource?: any;
        selectFields?: import("../../typeDefs/field").fields;
    }): Promise<any>;
    function getRouteKeys(): string[];
    function getRouteKeysFilters({ routeKeys, req, id, idKey, idTarget, fallbackFilters }?: {
        routeKeys?: string[];
        req?: any;
        id?: any;
        idKey?: string;
        idTarget?: string;
        fallbackFilters?: any;
    }): Promise<any>;
    function getRoutes(): import("../../typeDefs/route").routes;
    function getSelectFields({ resource, fields, selectInputKey, inputs, routeObject, selectable }?: {
        resource?: any;
        fields?: import("../../typeDefs/field").fields;
        selectInputKey?: string;
        inputs?: any;
        routeObject?: import("../../typeDefs/route").route;
        selectable?: boolean;
    }): Promise<import("../../typeDefs/field").fields>;
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
        fields?: import("../../typeDefs/field").fields;
    }): Promise<import("../../typeDefs/field").fields>;
    function getUpdateInputs({ setUpdateInputs, updateFields }?: {
        setUpdateInputs?: boolean;
        updateFields?: import("../../typeDefs/field").fields;
    }): Promise<any>;
    function hook(hook: string): Promise<any>;
    function sanitizeInput({ value, field }: {
        value: any;
        field: import("../../typeDefs/field").field;
    }): Promise<any>;
    function sanitizeInputs({ setInputs, fields, inputs, setDirtyInputs }?: {
        setInputs?: boolean;
        fields?: import("../../typeDefs/field").fields;
        inputs?: any;
        setDirtyInputs?: boolean;
    }): Promise<any>;
    function setPaginationHeaders({ res, total, collection, count, skip, limit, page, start, end, range, hasPrevPage, hasNextPage, prevPage, nextPage, lastPage }?: {
        res?: any;
        total?: number;
        collection?: any[];
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
        resource?: any;
        filters?: any;
    }): Promise<any>;
    function validateInput({ value, field, key }: {
        value?: any;
        field: import("../../typeDefs/field").field;
        key?: string;
    }): Promise<any>;
    function validateInputs({ setValidationErrors, fields, inputs, checkRequired }?: {
        setValidationErrors?: boolean;
        fields?: import("../../typeDefs/field").fields;
        inputs?: any;
        checkRequired?: boolean;
    }): Promise<any>;
    function getCollectionResponse({ collection, fields }?: {
        collection?: any[];
        fields?: import("../../typeDefs/field").fields;
    }): Promise<any>;
    function getDirtyInputs({ setDirtyInputs, force, inputs, resource }?: {
        setDirtyInputs?: boolean;
        inputs?: any;
        resource?: any;
        force?: boolean;
    }): Promise<any>;
}
