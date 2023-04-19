declare class CategoryService {
    constructor();
    getAll: () => Promise<(import("mongoose").Document<unknown, any, import("../modle/category").ICategory> & Omit<import("../modle/category").ICategory & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
}
declare const _default: CategoryService;
export default _default;
