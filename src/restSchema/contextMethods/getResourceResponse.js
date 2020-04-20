module.exports = async function({ resource = null } = {}) {
  const context = this
  await context.hook("beforeGetResourceResponse")
  const resourceResponse = resource || context.resource || (await context.getResource())
  const response = await this.getResponseValuesFromResource({
    fields: context.fields,
    resource: resourceResponse
  })
  context.response = response
  await context.hook("afterGetResourceResponse")
  return response
}
