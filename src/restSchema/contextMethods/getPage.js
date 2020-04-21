module.exports = async function({ skip = null, limit = null } = {}) {
  const context = this
  skip = skip || (await context.getSkip())
  limit = limit || (await context.getLimit())

  return (skip / limit) % 1 === 0 ? Math.ceil(skip / limit) + 1 : Math.ceil(skip / limit)
}
