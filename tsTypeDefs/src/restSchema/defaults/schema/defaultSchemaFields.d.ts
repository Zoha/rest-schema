import { ObjectId } from "../../types";
export namespace _id {
    export { ObjectId as type };
    export const creatable: boolean;
    export const updatable: boolean;
}
export namespace createdAt {
    export const type: DateConstructor;
    const creatable_1: boolean;
    export { creatable_1 as creatable };
    const updatable_1: boolean;
    export { updatable_1 as updatable };
}
export namespace updatedAt {
    const type_1: DateConstructor;
    export { type_1 as type };
    const creatable_2: boolean;
    export { creatable_2 as creatable };
    const updatable_2: boolean;
    export { updatable_2 as updatable };
}
