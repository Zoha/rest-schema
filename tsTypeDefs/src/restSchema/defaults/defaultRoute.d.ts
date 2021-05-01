export const name: string;
export const method: string;
export const path: string;
export const inputsTarget: string[];
export const selectable: boolean;
export const filterable: boolean;
export const middleware: any[];
export const routeKeys: any;
export const filters: {};
export const hooks: {};
export const wrappers: any;
export const pagination: {};
export const saveNullInputsInDatabase: any;
export const returnNullValuesInResponse: any;
export const errorOnInvalidLimit: any;
export namespace meta {
    const select: string;
    const sort: string;
    const limit: string;
    const skip: string;
    const page: string;
}
export function handler(context: any): Promise<{
    message: any;
}>;
export namespace filteringOperators {
    function $eq(v: any, k: any, type: any): {
        $eq: any;
    };
    function $gt(v: any, k: any, type: any): {
        $gt: any;
    };
    function $gte(v: any, k: any, type: any): {
        $gte: any;
    };
    function $in(v: any, k: any, type: any): {
        $in: any;
    };
    function $lt(v: any, k: any, type: any): {
        $lt: any;
    };
    function $lte(v: any, k: any, type: any): {
        $lte: any;
    };
    function $ne(v: any, k: any, type: any): {
        $ne: any;
    };
    function $nin(v: any, k: any, type: any): {
        $nin: any;
    };
    function $exists(): {
        $exists: boolean;
    };
    function $notExists(): {
        $exists: boolean;
    };
    function $null(): any;
    function $notNull(): {
        $ne: any;
    };
    function $regex(v: any): {
        $regex: RegExp;
    };
    function $regexi(v: any): {
        $regex: RegExp;
    };
}
