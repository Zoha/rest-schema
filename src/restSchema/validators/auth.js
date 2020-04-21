module.exports = async (value, callback, key, context) => {
  if (!callback || typeof callback != "function") {
    throw new Error("auth validator should be a function")
  }
  return !!(await callback(value, context))
}
