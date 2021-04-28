declare function _exports(): messages;
export = _exports;
export type resource = import("../../../typeDefs/context").resource;
export type context = import("../../../typeDefs/context").context;
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
export type fields = import("../../../typeDefs/field").fields;
