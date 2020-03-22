module.exports = async function() {
  const context = this
  await context.hook("beforeGetResourceResponse")
  const resource = context.resource || (await context.getResource())
  const response = await this.getResponseValuesFromResource(context.fields, resource)
  context.response = response
  await context.hook("afterGetResourceResponse")
  return response
}
