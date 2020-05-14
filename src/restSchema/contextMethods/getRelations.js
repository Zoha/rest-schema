const { getSchemaModel } = require("../getSchemaModel")
const relationTypes = require("../enums/relationTypes")

module.exports = async function({ fields = null } = {}) {
  const context = this
  fields =
    (fields && (await context.getFields({ fields }))) ||
    context.fields ||
    (await context.getFields())

  const relations = {}
  await Promise.all(
    Object.keys(fields).map(async fieldName => {
      const field = fields[fieldName]
      if (!field) {
        return
      }
      const isArrayOfRef = field.type == Array && field.children[0].ref
      let ref = isArrayOfRef ? field.children[0].ref : field.ref
      const refPath = isArrayOfRef ? field.children[0].refPath : field.refPath
      if (refPath) {
        const inputs = await context.getResource()
        ref = await context.getNestedInput({ key: refPath, inputs })
      }
      if (ref) {
        const relationSchemaBuilder =
          field.ref.constructor && field.ref.constructor.name === "SchemaBuilder"
            ? field.ref
            : getSchemaModel(field.ref)
        if (relationSchemaBuilder) {
          relations[fieldName] = {
            schemaBuilder: relationSchemaBuilder,
            type: isArrayOfRef ? relationTypes.collection : relationTypes.resource,
            field,
            fieldName
          }
        }
      }
    })
  )
  return relations
}
