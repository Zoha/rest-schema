export = RestSchemaError;
declare class RestSchemaError extends Error {
    constructor(...args: any[]);
    status: number;
    /**
     *
     * @param {import("../../../typeDefs/context").context} context
     * @param {import("../../../typeDefs/context").request} req
     * @param {import("../../../typeDefs/context").response} res
     */
    handler(context: import("../../../typeDefs/context").context, req: import("../../../typeDefs/context").request, res: import("../../../typeDefs/context").response): import("express").Response<any, Record<string, any>>;
}
