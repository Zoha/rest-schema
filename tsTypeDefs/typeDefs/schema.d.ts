/// <reference types="mongoose" />
export type context = import('./context').context;
export type hookNamesList = ("before" | "after" | "error" | "beforeCreateResource" | "afterCreateResource" | "afterDeleteResource" | "beforeGetCollection" | "afterGetCollection" | "beforeGetCollectionResponse" | "afterGetCollectionResponse" | "beforeGetResource" | "afterGetResource" | "beforeGetResourceResponse" | "afterGetResourceResponse" | "beforeUpdateResource" | "afterUpdateResource" | "afterMiddleware");
export type fields = import("./field").fields;
export type routes = import("./route").routes;
export type defaults = import("../src/restSchema/defaults").defaults;
export type filtersCallback = (context: context) => object;
export type filters = {
    [x: string]: any;
} | filtersCallback;
export type paginationPage = (context: context) => number;
export type paginationLimit = (context: context) => number;
export type paginationMinLimit = (context: context) => number;
export type paginationMaxLimit = (context: context) => number;
export type sort = string | {
    [x: string]: (-1 | 1);
};
export type paginationSort = (context: context) => sort;
export type paginationDefaultFilters = (context: context) => filters;
export type paginationSkip = (context: context) => number;
export type paginationProps = {
    page?: number;
    limit?: number;
    minLimit?: number;
    maxLimit?: number;
    sort?: sort;
    defaultFilters?: filters;
    skip?: number;
};
export type paginationInput = {
    page?: any | paginationPage;
    limit?: number | paginationLimit;
    minLimit?: number | paginationMinLimit;
    maxLimit?: number | paginationMaxLimit;
    sort?: string | paginationSort;
    defaultFilters?: filters | paginationDefaultFilters;
    skip?: number | paginationSkip;
};
export type paginationCallback = (context: context) => paginationInput;
export type pagination = paginationInput | paginationCallback;
export type errorCallback = (err: import("../src/restSchema/errors/restSchemaError"), req: import("express").Request, res: import("express").Response, next: Function) => any;
export type responseCallback = (res: Response, ctx: context) => any;
export type wrappers = {
    response: responseCallback;
    error: errorCallback;
};
export type expressRequestHandler = import('express').RequestHandler;
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
    beforeGetAggregateCollection?: (hookHandler | Promise<hookHandler>);
    afterGetCollection?: (hookHandler | Promise<hookHandler>);
    afterGetAggregateCollection?: (hookHandler | Promise<hookHandler>);
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
export type model = import("mongoose").Model<any, any, any>;
export type schema = {
    model?: import("mongoose").Model<any, any, any>;
    fields?: fields;
    routes?: routes;
    pagination?: pagination;
    wrappers?: wrappers;
    filters?: filters;
    middleware?: middleware;
    routeKeys?: Array<string>;
    hooks?: hooks;
    defaults?: defaults;
    name?: string;
    saveNullInputsInDatabase?: boolean;
    returnNullValuesInResponse?: boolean;
    maximumRelationDepth?: number;
    errorOnInvalidLimit?: boolean;
};
