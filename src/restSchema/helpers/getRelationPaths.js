module.exports = path => {
  const pathRegexp = new RegExp(/\/[^/]+(.*)$/, "i")
  const pathResult = pathRegexp.exec(path)
  if (!pathResult || !pathResult[1]) {
    return null
  }
  const fieldNameResult = /\/([^/]+).*/.exec(pathResult[1])
  if (!fieldNameResult || !fieldNameResult[1]) {
    return null
  }

  return {
    fieldName: fieldNameResult[1],
    path: pathResult[1]
  }
}
