const isFunction = require("../helpers/isFunction")

module.exports = async (items, key, context) => {
  let collection

  if (!items || !items.length) {
    return items
  }

  if (key === undefined) {
    collection = items.filter((element, index, self) => self.indexOf(element) === index)
  } else {
    collection = []

    const usedKeys = []

    for (let iterator = 0, { length } = items; iterator < length; iterator += 1) {
      let uniqueKey
      if (isFunction(key)) {
        uniqueKey = await key(items[iterator], context)
      } else {
        uniqueKey = items[iterator][key]
      }

      if (usedKeys.indexOf(uniqueKey) === -1) {
        collection.push(items[iterator])
        usedKeys.push(uniqueKey)
      }
    }
  }

  return collection
}
