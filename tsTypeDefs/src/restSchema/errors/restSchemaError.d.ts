export = RestSchemaError;
declare class RestSchemaError extends Error {
    /**
     *
     * @param {import("../../../typeDefs/context").context} context
     * @param {import("../../../typeDefs/context").request} req
     * @param {import("../../../typeDefs/context").response} res
     */
    handler(context: import("../../../typeDefs/context").context, req: any, res: any): any;
}
