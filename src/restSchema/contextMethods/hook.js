/**
 * @typedef {import("../../../typeDefs/context").resource} resource
 */

/**
 * @typedef {import("../../../typeDefs/context").context} context
 */

/**
 * @typedef {import("../../../typeDefs/field").fields} fields
 */

/**
 * @typedef {import("../../../typeDefs/schema").hooks} hooks
 */

/**
 *
 * @param {context} context
 * @param {string} hook
 */
const getPluginHooksFor = (context, hook) => {
  let hooks = []
  if (context.defaults && context.defaults.defaultPluginHooks) {
    /** @type {hooks} */
    const defaultHooks = context.defaults.defaultPluginHooks
    if (defaultHooks.global && defaultHooks.global[hook]) {
      hooks = hooks.concat(defaultHooks.global[hook])
    }
    if (defaultHooks[context.route] && defaultHooks[context.route][hook]) {
      hooks = hooks.concat(defaultHooks[context.route][hook])
    }
  }
  return hooks
}

const callHooksOn = async (target, context, hook) => {
  const { route } = context

  if (!target) {
    return
  }

  // global hooks
  if (target[hook] && typeof target[hook] === "function") {
    await target[hook](context)
  }

  // global object hooks
  if (target.global && target.global[hook] && typeof target.global[hook] === "function") {
    await target.global[hook](context)
  }

  // route hooks
  if (target[route] && target[route][hook] && typeof target[route][hook] === "function") {
    await target[route][hook](context)
  }
}

/**
 * @this context
 * @param {string} hook
 * @returns {Promise.<*>}
 */
module.exports = async function(hook) {
  const context = this
  const { schema } = context
  const { routeObject } = context

  // plugin hooks as array
  const pluginHooks = getPluginHooksFor(context, hook)
  if (pluginHooks.length) {
    for (let i = 0; i < pluginHooks.length; i += 1) {
      await pluginHooks[i](context)
    }
  }

  await callHooksOn(schema.hooks, context, hook)
  await callHooksOn(routeObject.hooks, context, hook)
}
