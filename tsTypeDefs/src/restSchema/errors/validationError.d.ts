export = ValidationError;
declare class ValidationError extends RestSchemaError {
    /**
     *
     * @param {string} message
     * @param {import("../../../typeDefs/context").validationErrors} validationData
     */
    constructor(message: string, validationData: import("../../../typeDefs/context").validationErrors);
    validationData: import("../../../typeDefs/context").validationErrors;
}
import RestSchemaError = require("./restSchemaError");
