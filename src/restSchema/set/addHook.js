const { defaultPluginHooks } = require("../defaults")

module.exports = (route, hookName, hook, { target = defaultPluginHooks } = {}) => {
  if (typeof route !== "string" || typeof hookName !== "string" || typeof hook !== "function") {
    return
  }

  if (!target[route]) {
    target[route] = {}
  }

  if (!target[route][hookName]) {
    target[route][hookName] = []
  }

  target[route][hookName].push(hook)
}
