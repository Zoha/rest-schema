module.exports = async function(hook) {
  const context = this
  const { schema } = context
  const { route } = context

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
