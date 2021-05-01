/// <reference types="mongoose" />
export type resource = import("./context").resource;
export type fieldType = (ArrayConstructor | BooleanConstructor | StringConstructor | {
    (val: any): import("mongoose").Types.ObjectId;
    /**
     * @typedef {(ArrayConstructor|BooleanConstructor|StringConstructor|ObjectId|MapConstructor|ArrayBufferConstructor|NumberConstructor|DateConstructor|ObjectConstructor)} fieldType
     */
    /**
     * @typedef {import('./context').context} context
     */
    /**
     * @typedef {import("mongoose").model} model
     */
    /**
     * @callback handlerCallback
     * @param {context} ctx
     * @return {*}
     *
     * @typedef objectForHandlerCallbackRoute
     * @type {object }
     * @property {handlerCallback} [create]
     * @property {handlerCallback} [update]
     * @property {handlerCallback} [delete]
     * @property {handlerCallback} [index]
     * @property {handlerCallback} [single]
     * @property {handlerCallback} [validate]
     * @property {handlerCallback} [count]
     *
     * @typedef {(objectForHandlerCallbackRoute | Object.<string ,handlerCallback>)} objectForHandlerCallback
     * @typedef {handlerCallback | objectForHandlerCallback} fieldPropHandler
     *
     *
     *
     *
     * @callback handlerCallbackWithValue
     * @param {*} value
     * @param {context} ctx
     * @return {*}
     *
     * @typedef objectForHandlerCallbackWithValueRoute
     * @type {object }
     * @property {handlerCallbackWithValue} [create]
     * @property {handlerCallbackWithValue} [update]
     * @property {handlerCallbackWithValue} [delete]
     * @property {handlerCallbackWithValue} [index]
     * @property {handlerCallbackWithValue} [single]
     * @property {handlerCallbackWithValue} [validate]
     * @property {handlerCallbackWithValue} [count]
     *
     * @typedef {(objectForHandlerCallbackWithValueRoute | Object.<string ,handlerCallbackWithValue>)} objectForHandlerCallbackWithValue
     * @typedef {handlerCallbackWithValue | objectForHandlerCallbackWithValue} fieldPropHandlerWithValue
     *
     *
     * @typedef {import("../src/restSchema/schemaBuilder")} schemaBuilder
     *
     *
     * @typedef objectForBoolean
     * @type {object}
     * @property {boolean} [create]
     * @property {boolean} [update]
     * @property {boolean} [delete]
     * @property {boolean} [index]
     * @property {boolean} [single]
     * @property {boolean} [validate]
     * @property {boolean} [count]
     *
     *
     * @typedef objectForNumber
     * @type {object}
     * @property {number} [create]
     * @property {number} [update]
     * @property {number} [delete]
     * @property {number} [index]
     * @property {number} [single]
     * @property {number} [validate]
     * @property {number} [count]
     *
     * @typedef objectForExistsIn
     * @type {object}
     * @property {string | model | schemaBuilder } [create]
     * @property {string | model | schemaBuilder } [update]
     * @property {string | model | schemaBuilder } [delete]
     * @property {string | model | schemaBuilder } [index]
     * @property {string | model | schemaBuilder } [single]
     * @property {string | model | schemaBuilder } [validate]
     * @property {string | model | schemaBuilder } [count]
     *
     * @typedef objectForNumberOrDate
     * @type {object}
     * @property {number | Date} [create]
     * @property {number | Date} [update]
     * @property {number | Date} [delete]
     * @property {number | Date} [index]
     * @property {number | Date} [single]
     * @property {number | Date} [validate]
     * @property {number | Date} [count]
     *
     * @typedef objectForString
     * @type {object}
     * @property {string} [create]
     * @property {string} [update]
     * @property {string} [delete]
     * @property {string} [index]
     * @property {string} [single]
     * @property {string} [validate]
     * @property {string} [count]
     *
     * @typedef objectForNumberArray
     * @type {object}
     * @property {number[]} [create]
     * @property {number[]} [update]
     * @property {number[]} [delete]
     * @property {number[]} [index]
     * @property {number[]} [single]
     * @property {number[]} [validate]
     * @property {number[]} [count]
     *
     * @typedef objectForNumberOrDateArray
     * @type {object}
     * @property {number[] | Date[]} [create]
     * @property {number[] | Date[]} [update]
     * @property {number[] | Date[]} [delete]
     * @property {number[] | Date[]} [index]
     * @property {number[] | Date[]} [single]
     * @property {number[] | Date[]} [validate]
     * @property {number[] | Date[]} [count]
     *
     * @typedef objectForStringArray
     * @type {object}
     * @property {string[]} [create]
     * @property {string[]} [update]
     * @property {string[]} [delete]
     * @property {string[]} [index]
     * @property {string[]} [single]
     * @property {string[]} [validate]
     * @property {string[]} [count]
     *
     * @typedef objectForNumberRegExp
     * @type {object}
     * @property {RegExp} [create]
     * @property {RegExp} [update]
     * @property {RegExp} [delete]
     * @property {RegExp} [index]
     * @property {RegExp} [single]
     * @property {RegExp} [validate]
     * @property {RegExp} [count]
     *
     * @typedef relation
     * @property {import("../src/restSchema/schemaBuilder")} schemaBuilder
     * @property {("collection"|"resource")} type
     * @property {field} field
     * @property {string} fieldName
     *
     * @callback findCallback
     * @param {resource} [resource]
     * @param {context} [ctx]
     * @param {context} [relationCtx]
     * @param {relation} [relation]
     * @returns {object}
     *
     */
    /**
     * @typedef {object} fieldProps
     * @property {(field[]| Object.<string , field> | fieldType)} [type]
     * @property {string} [key]
     * @property {string} [nestedKey]
     * @property {string} [uniqueKey]
     *
     * @property {boolean} [isNested]
     * @property {boolean} [isArrayNested]
     * @property {boolean} [isObjectNested]
     * @property {fields} [children]
     * @property {(field[]| Object.<string , field> | fieldType)} [of]
     *
     * @property { boolean } [db]
     * @property {(objectForBoolean | boolean | fieldPropHandler)} [creatable]
     * @property {(objectForBoolean | boolean | fieldPropHandler)} [updatable]
     * @property {(objectForBoolean | boolean | fieldPropHandler)} [filterable]
     * @property {(objectForBoolean | boolean | fieldPropHandler)} [sortable]
     * @property {(objectForBoolean | boolean | fieldPropHandler)} [hide]
     * @property {(objectForBoolean | boolean | fieldPropHandler)} [hideByDefault]
     * @property {fieldPropHandlerWithValue} [get]
     * @property {fieldPropHandlerWithValue} [set]
     *
     * @property {fieldPropHandlerWithValue} [sanitize]
     * @property {objectForBoolean | boolean} [trim]
     * @property {objectForBoolean | boolean} [lowercase]
     * @property {objectForBoolean | boolean} [uppercase]
     * @property {(fieldPropHandler|string|number|boolean|Date)} [default]
     * @property {objectForBoolean | boolean} [pickUniqueItems]
     *
     * @property {string} [ref]
     * @property {string | fieldPropHandler} [refPath]
     * @property {findCallback} [find]
     *
     * @property {fieldPropHandlerWithValue} [validate]
     * @property {objectForBoolean | boolean | fieldPropHandler} [unique]
     * @property {objectForBoolean | boolean | fieldPropHandler} [required]
     * @property {Array<number> | Array<Date> | objectForNumberOrDateArray | fieldPropHandler} [between]
     * @property {objectForNumberOrDate | number | Date | fieldPropHandler} [min]
     * @property {objectForNumberOrDate | number | Date | fieldPropHandler} [max]
     * @property {objectForNumber | number | fieldPropHandler} [minLength]
     * @property {objectForNumber | number | fieldPropHandler} [maxLength]
     * @property {objectForNumber | number | fieldPropHandler} [betweenLength]
     * @property {RegExp | objectForNumberRegExp | fieldPropHandler} [match]
     * @property {Array<string> | objectForStringArray | fieldPropHandler | Object.<string , string>} [enum]
     * @property {objectForExistsIn | string | model | schemaBuilder | fieldPropHandler} [existsIn]
     * @property {(objectForBoolean | boolean | fieldPropHandler)} [uniqueItems]
     *
     * @callback fieldsFunction
     * @param {context} context
     * @return {(fields|Promise.<fields>)}
     *
     * @typedef {(fieldProps | Object.<string , field> | Object.<string , *>)} field
     * @typedef {(fieldsFunction | Object.<string , field>)} fields
     */
    isValid: typeof import("bson").ObjectId.isValid;
    createFromHexString: typeof import("bson").ObjectId.createFromHexString;
    createFromTime: typeof import("bson").ObjectId.createFromTime;
    generate: typeof import("bson").ObjectId.generate;
    cacheHexString: boolean;
    prototype: any;
} | MapConstructor | ArrayBufferConstructor | NumberConstructor | DateConstructor | ObjectConstructor);
export type context = import('./context').context;
export type model = typeof import("mongoose").model;
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
export type schemaBuilder = import("../src/restSchema/schemaBuilder");
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
export type objectForExistsIn = {
    create?: string | model | schemaBuilder;
    update?: string | model | schemaBuilder;
    delete?: string | model | schemaBuilder;
    index?: string | model | schemaBuilder;
    single?: string | model | schemaBuilder;
    validate?: string | model | schemaBuilder;
    count?: string | model | schemaBuilder;
};
export type objectForNumberOrDate = {
    create?: number | Date;
    update?: number | Date;
    delete?: number | Date;
    index?: number | Date;
    single?: number | Date;
    validate?: number | Date;
    count?: number | Date;
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
export type objectForNumberOrDateArray = {
    create?: number[] | Date[];
    update?: number[] | Date[];
    delete?: number[] | Date[];
    index?: number[] | Date[];
    single?: number[] | Date[];
    validate?: number[] | Date[];
    count?: number[] | Date[];
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
    field: any;
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
    between?: Array<number> | Array<Date> | objectForNumberOrDateArray | fieldPropHandler;
    min?: objectForNumberOrDate | number | Date | fieldPropHandler;
    max?: objectForNumberOrDate | number | Date | fieldPropHandler;
    minLength?: objectForNumber | number | fieldPropHandler;
    maxLength?: objectForNumber | number | fieldPropHandler;
    betweenLength?: objectForNumber | number | fieldPropHandler;
    match?: RegExp | objectForNumberRegExp | fieldPropHandler;
    enum?: Array<string> | objectForStringArray | fieldPropHandler | {
        [x: string]: string;
    };
    existsIn?: objectForExistsIn | string | model | schemaBuilder | fieldPropHandler;
    uniqueItems?: (objectForBoolean | boolean | fieldPropHandler);
};
export type fieldsFunction = (context: context) => (fields | Promise<fields>);
export type field = (fieldProps | {
    [x: string]: field;
} | {
    [x: string]: any;
});
export type fields = (fieldsFunction | {
    [x: string]: field;
});
import { Date } from "../src/restSchema/types";
import { Array } from "../src/restSchema/types";
