import { Mixed } from "../types";
export declare const type: string;
export declare const key: string;
export declare const nestedKey: string;
export declare const uniqueKey: string;
export declare const isNested: boolean;
export declare const isArrayNested: boolean;
export declare const isObjectNested: boolean;
export declare const children: {};
export declare const db: boolean;
export declare const creatable: boolean;
export declare const updatable: boolean;
export declare const filterable: boolean;
export declare const sortable: boolean;
export declare const hide: boolean;
export declare const hideByDefault: boolean;
export declare const set: any;
export declare const get: any;
export declare const sanitize: any;
export declare const trim: boolean;
export declare const lowercase: boolean;
export declare const uppercase: boolean;
declare const _default: any;
export declare const pickUniqueItems: boolean;
export declare const ref: any;
export declare const refPath: any;
export declare function find(resource: any, ctx: any, relationCtx: any, relation: any): {
    $or: ({
        [x: number]: any;
        _id?: undefined;
    } | {
        _id: any;
    })[];
};
export declare const validate: any;
export declare const unique: boolean;
export declare const required: boolean;
export declare const min: any;
export declare const max: any;
export declare const between: any;
export declare const minLength: any;
export declare const maxLength: any;
export declare const betweenLength: any;
export declare const match: any;
declare const _enum: any;
export declare const existsIn: any;
export { Mixed as of, _default as default, _enum as enum };
