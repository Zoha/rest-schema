/* eslint-disable no-unused-vars */
const {
  Array,
  Boolean,
  Buffer,
  Date,
  Map,
  Mixed,
  Number,
  Object,
  ObjectId,
  String
} = require("../src/restSchema/types")

/**
 * @typedef {import("./context").resource} resource
 */

/**
 * @typedef {(ArrayConstructor|BooleanConstructor|StringConstructor|ObjectId|MapConstructor|ArrayBufferConstructor|NumberConstructor|DateConstructor|ObjectConstructor)} fieldType
 */

/**
 * @typedef {import('./context').context} context
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
 *
 *
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
 * @property {Array<number> | objectForNumberArray | fieldPropHandler} [between]
 * @property {objectForNumber | number | fieldPropHandler} [min]
 * @property {objectForNumber | number | fieldPropHandler} [max]
 * @property {objectForNumber | number | fieldPropHandler} [minLength]
 * @property {objectForNumber | number | fieldPropHandler} [maxLength]
 * @property {objectForNumber | number | fieldPropHandler} [betweenLength]
 * @property {RegExp | objectForNumberRegExp | fieldPropHandler} [match]
 * @property {Array<string> | objectForStringArray | fieldPropHandler} [enum]
 * @property {objectForString | string | fieldPropHandler} [existsIn]
 *
 * @callback fieldsFunction
 * @param {context} context
 * @return {(fields|Promise.<fields>)}
 *
 * @typedef {(fieldProps | Object.<string , *>)} field
 * @typedef {(fieldsFunction | Object.<string , field>)} fields
 */

module.exports = {}
