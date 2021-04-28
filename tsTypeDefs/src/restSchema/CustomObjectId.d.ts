export = RestSchemaObjectId;
declare function RestSchemaObjectId(val: any): mongoose.Types.ObjectId;
declare namespace RestSchemaObjectId {
    const isValid: typeof import("bson").ObjectId.isValid;
    const createFromHexString: typeof import("bson").ObjectId.createFromHexString;
    const createFromTime: typeof import("bson").ObjectId.createFromTime;
    const generate: typeof import("bson").ObjectId.generate;
    const cacheHexString: boolean;
}
import mongoose = require("mongoose");
