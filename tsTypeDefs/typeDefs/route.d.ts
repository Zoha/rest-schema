export type fieldType = import("./field").fieldType;
export type context = import('./context').context;
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
export type requestHandler = any;
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
