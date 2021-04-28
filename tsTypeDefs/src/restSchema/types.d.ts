/// <reference types="mongoose" />
declare const _exports: {
    readonly String: StringConstructor;
    readonly Number: NumberConstructor;
    readonly Object: ObjectConstructor;
    readonly Array: ArrayConstructor;
    readonly Boolean: BooleanConstructor;
    readonly Buffer: typeof Buffer;
    readonly Date: DateConstructor;
    readonly Map: MapConstructor;
    readonly Mixed: any;
    readonly ObjectId: {
        (val: any): import("mongoose").Types.ObjectId;
        isValid: typeof import("bson").ObjectId.isValid;
        createFromHexString: typeof import("bson").ObjectId.createFromHexString;
        createFromTime: typeof import("bson").ObjectId.createFromTime;
        generate: typeof import("bson").ObjectId.generate;
        cacheHexString: boolean;
        prototype: any;
    };
};
export = _exports;
