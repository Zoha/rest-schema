declare function _exports(newDefaultRouteData: any, { target, mergeFilteringOperators }?: {
    target?: import("../../../typeDefs/route").route;
    mergeFilteringOperators?: boolean;
}): void;
declare namespace _exports {
    function setDefaultRouteMeta(newDefaultRouteMeta: any, { target }?: {
        target?: import("../../../typeDefs/route").routeMeta;
    }): void;
    function setDefaultRouteFilteringOperators(newDefaultRouteFilteringOperators: any, { target }?: {
        target?: import("../../../typeDefs/route").filteringOperators;
    }): void;
}
export = _exports;
