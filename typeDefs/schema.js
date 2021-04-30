/**
 * @typedef {import('./context').context} context
 */

/**
 * @typedef {("before"|"after"|"error"|"beforeCreateResource"|"afterCreateResource"|"afterDeleteResource"|"beforeGetCollection"|"afterGetCollection"|"beforeGetCollectionResponse"|"afterGetCollectionResponse"|"beforeGetResource"|"afterGetResource"|"beforeGetResourceResponse"|"afterGetResourceResponse"|"beforeUpdateResource"|"afterUpdateResource"|"afterMiddleware")} hookNamesList
 */

/**
 * @typedef {import("./field").fields} fields
 * @typedef {import("./route").routes} routes
 * @typedef {import("../src/restSchema/defaults").defaults} defaults
 *
 * @callback filtersCallback
 * @param {context} context
 * @returns {object}
 *
 * @typedef {Object.<string , *>|filtersCallback} filters
 *
 *
 *
 * @callback paginationPage
 * @param {context} context
 * @returns {number}
 *
 * @callback paginationLimit
 * @param {context} context
 * @returns {number}
 *
 * @callback paginationMinLimit
 * @param {context} context
 * @returns {number}
 *
 * @callback paginationMaxLimit
 * @param {context} context
 * @returns {number}
 *
 * @callback paginationSort
 * @param {context} context
 * @returns {string}
 *
 * @callback paginationDefaultFilters
 * @param {context} context
 * @returns {filters}
 *
 * @callback paginationSkip
 * @param {context} context
 * @returns {number}
 *
 *
 * @typedef {object} paginationProps
 * @property {number} [page]
 * @property {number} [limit]
 * @property {number} [minLimit]
 * @property {number} [maxLimit]
 * @property {string} [sort]
 * @property {filters} [defaultFilters]
 * @property {number} [skip]
 *
 * @typedef {object} paginationInput
 * @property {page | paginationPage} [page]
 * @property {number | paginationLimit} [limit]
 * @property {number | paginationMinLimit} [minLimit]
 * @property {number | paginationMaxLimit} [maxLimit]
 * @property {string | paginationSort} [sort]
 * @property {filters | paginationDefaultFilters} [defaultFilters]
 * @property {number | paginationSkip} [skip]
 *
 * @callback paginationCallback
 * @param {context} context
 * @returns {paginationInput}
 *
 * @typedef {paginationInput | paginationCallback} pagination
 *
 * @callback errorCallback
 * @param {import("../src/restSchema/errors/restSchemaError")} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {function} next
 *
 * @callback responseCallback
 * @param {Response} res
 * @param {context} ctx
 *
 * @typedef {object} wrappers
 * @property {responseCallback} response
 * @property {errorCallback} error
 *
 * @typedef {import('express').RequestHandler} expressRequestHandler
 *
 * @callback next
 * @param {Error} [error]
 *
 * @callback requestHandler
 * @async
 * @param {(import("./context").request & Object.<string , any>)} [req]
 * @param {(import("./context").response & Object.<string , any>)} [res]
 * @param {next} [request]
 *
 * @typedef {object} routesSpecificMiddleware
 * @property {(requestHandler | Array.<requestHandler>)} [create]
 * @property {(requestHandler | Array.<requestHandler>)} [update]
 * @property {(requestHandler | Array.<requestHandler>)} [count]
 * @property {(requestHandler | Array.<requestHandler>)} [single]
 * @property {(requestHandler | Array.<requestHandler>)} [index]
 * @property {(requestHandler | Array.<requestHandler>)} [validate]
 * @property {(requestHandler | Array.<requestHandler>)} [delete]
 *
 * @typedef {(routesSpecificMiddleware | Object.<string , requestHandler> | Object.<string , Array.<requestHandler>>)} routesMiddleware
 *
 * @typedef {(routesMiddleware | Array.<requestHandler> | requestHandler)} middleware
 *
 * @callback hookHandler
 * @param {context} ctx
 *
 * @typedef {object} hooksList
 * @property {(hookHandler|Promise.<hookHandler>)} [before]
 * @property {(hookHandler|Promise.<hookHandler>)} [after]
 * @property {(hookHandler|Promise.<hookHandler>)} [error]
 * @property {(hookHandler|Promise.<hookHandler>)} [beforeCreateResource]
 * @property {(hookHandler|Promise.<hookHandler>)} [afterCreateResource]
 * @property {(hookHandler|Promise.<hookHandler>)} [afterDeleteResource]
 * @property {(hookHandler|Promise.<hookHandler>)} [beforeGetCollection]
 * @property {(hookHandler|Promise.<hookHandler>)} [afterGetCollection]
 * @property {(hookHandler|Promise.<hookHandler>)} [beforeGetCollectionResponse]
 * @property {(hookHandler|Promise.<hookHandler>)} [afterGetCollectionResponse]
 * @property {(hookHandler|Promise.<hookHandler>)} [beforeGetResource]
 * @property {(hookHandler|Promise.<hookHandler>)} [afterGetResource]
 * @property {(hookHandler|Promise.<hookHandler>)} [beforeGetResourceResponse]
 * @property {(hookHandler|Promise.<hookHandler>)} [afterGetResourceResponse]
 * @property {(hookHandler|Promise.<hookHandler>)} [beforeUpdateResource]
 * @property {(hookHandler|Promise.<hookHandler>)} [afterUpdateResource]
 * @property {(hookHandler|Promise.<hookHandler>)} [afterMiddleware]
 *
 *
 *
 * @typedef {object} hooksListWithRoute
 * @property {hooksList} [global]
 * @property {hooksList} [create]
 * @property {hooksList} [update]
 * @property {hooksList} [delete]
 * @property {hooksList} [index]
 * @property {hooksList} [single]
 * @property {hooksList} [count]
 * @property {hooksList} [validate]
 *
 * @typedef {(hooksList & hooksListWithRoute)} hooks
 */

/**
 * @typedef {import("mongoose").Model} model
 */

/**
 * @typedef {object} schema
 * @property {model} [model]
 * @property {fields} [fields]
 * @property {routes} [routes]
 * @property {pagination} [pagination]
 * @property {wrappers} [wrappers]
 * @property {filters} [filters]
 * @property {middleware} [middleware]
 * @property {Array.<string>} [routeKeys]
 * @property {hooks} [hooks]
 * @property {defaults} [defaults]
 * @property {string} [name]
 * @property {boolean} [saveNullInputsInDatabase]
 * @property {boolean} [returnNullValuesInResponse]
 * @property {number} [maximumRelationDepth]
 * @property {boolean} [errorOnInvalidLimit]
 *
 */

module.exports = {}
