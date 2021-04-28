/// <reference types="mongoose" />
export type resource = import("./context").resource;
export type fieldType = (ArrayConstructor | BooleanConstructor | StringConstructor | {
    (val: any): import("mongoose").Types.ObjectId;
    isValid: typeof import("bson").ObjectId.isValid;
    createFromHexString: typeof import("bson").ObjectId.createFromHexString;
    createFromTime: typeof import("bson").ObjectId.createFromTime;
    generate: typeof import("bson").ObjectId.generate;
    cacheHexString: boolean;
    prototype: any;
} | MapConstructor | ArrayBufferConstructor | NumberConstructor | DateConstructor | ObjectConstructor);
export type context = import('./context').context;
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
    db?: boolean;
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
import { Date } from "../src/restSchema/types";
import { Array } from "../src/restSchema/types";
