const cast = require("../helpers/cast")

module.exports = async function({ resource = null } = {}) {
  const context = this
  await context.hook("beforeGetResourceResponse")
  resource = cast(resource).to(Object) || context.resource || (await context.getResource())
  const response = await this.getResponseValuesFromResource({
    fields: context.fields,
    resource: resource
  })
  context.response = response
  await context.hook("afterGetResourceResponse")
  return response
}
