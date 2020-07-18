const getPluginHooksFor = (context, hook) => {
  let hooks = []
  if (context.defaults && context.defaults.defaultPluginHooks) {
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

module.exports = async function(hook) {
  const context = this
  const { schema } = context
  const { route } = context

  // plugin hooks as array
  const pluginHooks = getPluginHooksFor(context, hook)
  if (pluginHooks.length) {
    for (let i = 0; i < pluginHooks.length; i += 1) {
      await pluginHooks[i](context)
    }
  }

  if (!schema.hooks) {
    return
  }

  // global hooks
  if (schema.hooks[hook] && typeof schema.hooks[hook] === "function") {
    await schema.hooks[hook](context)
  }

  // global object hooks
  if (
    schema.hooks.global &&
    schema.hooks.global[hook] &&
    typeof schema.hooks.global[hook] === "function"
  ) {
    await schema.hooks.global[hook](context)
  }

  // route hooks
  if (
    schema.hooks[route] &&
    schema.hooks[route][hook] &&
    typeof schema.hooks[route][hook] === "function"
  ) {
    await schema.hooks[route][hook](context)
  }
}
