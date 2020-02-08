module.exports = async function() {
  const context = this;
  const resource = context.resource || (await context.getResource());
  let response = await this.getResponseValuesFromResource(
    context.fields,
    resource
  );
  context.response = response;
  return response;
};
