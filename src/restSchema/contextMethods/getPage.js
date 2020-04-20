module.exports = async function({ skip = null, limit = null } = {}) {
  const context = this
  const requestSkip = skip || (await context.getSkip())
  const requestLimit = limit || (await context.getLimit())

  return (requestSkip / requestLimit) % 1 === 0
    ? Math.ceil(requestSkip / requestLimit) + 1
    : Math.ceil(requestSkip / requestLimit)
}
