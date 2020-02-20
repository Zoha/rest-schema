module.exports = async function() {
  const context = this;
  const collection = context.collection || (await context.getCollection());
  let finalResponseFromCollection = [];
  for (let resource of collection) {
    finalResponseFromCollection.push(
      await this.getResponseValuesFromResource(context.fields, resource)
    );
  }
  context.response = response;
  return response;
};
