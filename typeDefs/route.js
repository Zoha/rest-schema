/**
 * @typedef {import("./field").fieldType} fieldType
 */

// TODO fix context
/**
 * @typedef {{ok : true}} context
 */

/**
 * @typedef {object} routeMeta
 * @property {string} [select]
 * @property {string} [sort]
 * @property {string} [limit]
 * @property {string} [skip]
 * @property {string} [page]
 *
 * @callback routeHandlerCallback
 * @param {context} ctx
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
 *
 * @typedef {object} route
 * @property {(routeHandlerCallback|Promise<routeHandlerCallback>)} handler
 * @property {('create' | 'update' |'delete' | 'index' |'single' | 'validate' |'count' | string)} [name]
 * @property {('get'|'post'|'delete'|'put'|'patch')} [method]
 * @property {string} [path]
 * @property {Array.<('query'|'body'|'header')>} [inputsTarget]
 * @property {boolean} [selectable]
 * @property {boolean} [filterable]
 * @property {routeMeta} [meta]
 * @property {filteringOperators} [filteringOperators]
 *
 * @typedef {Array.<(route | 'create' | 'update' | 'delete' | 'count' | 'single' | 'validate' | 'single')>} routes
 */

module.exports = {}
