/**
 *
 * @param {*} value - value to cast
 * @returns {string|null}
 */
module.exports = function castString(value) {
  // If null or undefined
  if (value == null) {
    return value
  }

  // handle documents being passed
  // eslint-disable-next-line no-underscore-dangle
  const valueId = value._id
  if (valueId && typeof valueId === "string") {
    return valueId
  }

  // Re: gh-647 and gh-3030, we're ok with casting using `toString()`
  // **unless** its the default Object.toString, because "[object Object]"
  // doesn't really qualify as useful data
  if (value.toString && value.toString !== Object.prototype.toString && !Array.isArray(value)) {
    return value.toString()
  }

  return null
}
