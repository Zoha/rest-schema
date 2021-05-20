/**
 * @typedef {import("./field").fieldType} fieldType
 */

/**
 * @typedef {import('./context').context} context
 */

/**
 * @typedef {object} routeMeta
 * @property {string} [select]
 * @property {string} [sort]
 * @property {string} [limit]
 * @property {string} [skip]
 * @property {string} [page]
 * @property {string} [search]
 * @property {string} [randomSort]
 * @property {string} [load]
 *
 * @typedef {import("express").Request} request
 * @typedef {import("express").Response} response
 *
 *
 * @callback routeHandlerCallback
 * @param {context} [ctx]
 * @param {request & Object.<string , any>} [req]
 * @param {response & Object.<string , any>} [res]
 * @param {function).next} res
 * @returns {*}
 *
 * @callback filteringOperatorCallback
 * @param {string} value
 * @param {string} key
 * @param {fieldType} type
 * @return {Object.<string,*>}
 *
 * @typedef {object} filteringOperatorsDefaults
 * @property {filteringOperatorCallback} $eq:
 * @property {filteringOperatorCallback} $gt:
 * @property {filteringOperatorCallback} $gte:
 * @property {filteringOperatorCallback} $in:
 * @property {filteringOperatorCallback} $lt:
 * @property {filteringOperatorCallback} $lte:
 * @property {filteringOperatorCallback} $ne:
 * @property {filteringOperatorCallback} $nin:
 * @property {filteringOperatorCallback} $exists
 * @property {filteringOperatorCallback} $notExists
 * @property {filteringOperatorCallback} $null
 * @property {filteringOperatorCallback} $notNull
 * @property {filteringOperatorCallback} $regex:
 * @property {filteringOperatorCallback} $regexi:
 *
 * @typedef {(filteringOperatorsDefaults | Object.<string , filteringOperatorCallback>)} filteringOperators
 *
 * @typedef {import('express').RequestHandler} requestHandler
 *
 * @typedef
 *
 * @typedef {object } routeProps
 * @property {(routeHandlerCallback|Promise<routeHandlerCallback>)} handler
 * @property {requestHandler[] | requestHandler} [middleware]
 * @property {import('./schema').route} [routeKeys]
 * @property {import("./schema").filters} filters
 * @property {import("./schema").hooks} [hooks]
 * @property {import("./schema").wrappers} [wrappers]
 * @property {import("./schema").pagination} [pagination]
 * @property {boolean} [saveNullInputsInDatabase]
 * @property {boolean} [returnNullValuesInResponse]
 * @property {number} [errorOnInvalidLimit]
 * @property {('create' | 'update' |'delete' | 'index' |'single' | 'validate' |'count' | string)} [name]
 * @property {('get' | 'post' | 'delete' | 'put' | 'patch' | string)} [method]
 * @property {string} [path]
 * @property {Array.<('query'|'body'|'header'|string)>} [inputsTarget]
 * @property {boolean} [selectable]
 * @property {boolean} [filterable]
 * @property {routeMeta} [meta]
 * @property {filteringOperators} [filteringOperators]
 *
 * @typedef {routeProps & Object<string , any>} route
 *
 * @typedef {Array.<'create' | 'update' | 'delete' | 'count' | 'single' | 'validate' | 'index'| route>| Object<string , route>} routes
 */

module.exports = {}
