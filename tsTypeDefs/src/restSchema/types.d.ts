declare const _exports: {
    readonly String: StringConstructor;
    readonly Number: NumberConstructor;
    readonly Object: ObjectConstructor;
    readonly Array: ArrayConstructor;
    readonly Boolean: BooleanConstructor;
    readonly Buffer: any;
    readonly Date: DateConstructor;
    readonly Map: any;
    readonly Mixed: any;
    readonly ObjectId: {
        (val: any): any;
        isValid: any;
        createFromHexString: any;
        createFromTime: any;
        generate: any;
        cacheHexString: any;
        prototype: any;
    };
};
export = _exports;
