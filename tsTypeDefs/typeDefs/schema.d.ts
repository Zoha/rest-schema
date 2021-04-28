/// <reference types="mongoose" />
export type context = import('./context').context;
export type hookNamesList = ("before" | "after" | "error" | "beforeCreateResource" | "afterCreateResource" | "afterDeleteResource" | "beforeGetCollection" | "afterGetCollection" | "beforeGetCollectionResponse" | "afterGetCollectionResponse" | "beforeGetResource" | "afterGetResource" | "beforeGetResourceResponse" | "afterGetResourceResponse" | "beforeUpdateResource" | "afterUpdateResource" | "afterMiddleware");
export type fields = import("./field").fields;
export type routes = import("./route").routes;
export type defaults = import("../src/restSchema/defaults").defaults;
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
