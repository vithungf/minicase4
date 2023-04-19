declare class UserService {
    constructor();
    getAll: () => Promise<(import("mongoose").Document<unknown, any, import("../modle/user").IUser> & Omit<import("../modle/user").IUser & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    checkUser: (username: any) => Promise<import("mongoose").Document<unknown, any, import("../modle/user").IUser> & Omit<import("../modle/user").IUser & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    checkUsername: (user: any) => Promise<import("mongoose").Document<unknown, any, import("../modle/user").IUser> & Omit<import("../modle/user").IUser & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    registerUser: (user: any) => Promise<import("mongoose").Document<unknown, any, import("../modle/user").IUser> & Omit<import("../modle/user").IUser & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findBYId: (id: any) => Promise<import("mongoose").Document<unknown, any, import("../modle/user").IUser> & Omit<import("../modle/user").IUser & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    private orderProduct;
    findCartByUser: (user: any) => Promise<Omit<Omit<import("mongoose").Document<unknown, any, import("../modle/cart").ICart> & Omit<import("../modle/cart").ICart & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>[]>;
    getAllCart: () => Promise<Omit<Omit<import("mongoose").Document<unknown, any, import("../modle/cart").ICart> & Omit<import("../modle/cart").ICart & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>[]>;
    changeStatusCart: (user: any) => Promise<string>;
}
declare const _default: UserService;
export default _default;
