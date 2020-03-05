const { resource } = require("./index");

module.exports = class schemaBuilder {
  constructor(schema) {
    this.schema = schema;
    this.name = schema.name;
  }

  resource() {
    return resource(this.schema);
  }
};
