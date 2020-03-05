const schemaFormatter = require("./schemaFormatters/schemaFormatter");
const { upperCaseFirst } = require("upper-case-first");
const { singular } = require("pluralize");
const SchemaBuilder = require("./schemaBuilder");

const definedSchemaList = {};

const formatName = name => {
  return upperCaseFirst(singular(name));
};

module.exports = (model, fields, options = {}) => {
  if (fields != undefined) {
    const schema = schemaFormatter({ model, fields, ...options });
    let schemaName = definedSchemaList.name;
    if (schemaName == "noname") {
      schemaName = "Schema" + Object.keys(definedSchemaList).length;
    }
    definedSchemaList[formatName(schemaName)] = new SchemaBuilder(schema);
    return schema;
  } else if (typeof model == "string") {
    model = formatName(model);
    if (definedSchemaList[model] == undefined) {
      throw new Error(`there is no schema with ${model} name`);
    }
    return definedSchemaList[model];
  }

  throw new Error(
    "model name should be a string for getting schema, ${typeof model} given. remember that for creating schema second parameter is required"
  );
};
