declare class ProductService {
    constructor();
    getAll: () => Promise<Omit<import("mongoose").Document<unknown, any, import("../modle/product").IProduct> & Omit<import("../modle/product").IProduct & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
    save: (product: any) => Promise<import("mongoose").Document<unknown, any, import("../modle/product").IProduct> & Omit<import("../modle/product").IProduct & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    private update;
    findById: (id: any) => Promise<import("mongoose").Document<unknown, any, import("../modle/product").IProduct> & Omit<import("../modle/product").IProduct & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    private remove;
    search: (name: any) => Promise<Omit<import("mongoose").Document<unknown, any, import("../modle/product").IProduct> & Omit<import("../modle/product").IProduct & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[]>;
}
declare const _default: ProductService;
export default _default;
