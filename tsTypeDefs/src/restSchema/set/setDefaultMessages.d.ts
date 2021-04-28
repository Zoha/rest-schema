declare function _exports(newMessages: any, { target }?: {
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
declare namespace _exports {
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
