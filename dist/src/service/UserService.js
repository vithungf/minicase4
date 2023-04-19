"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../modle/user");
const cart_1 = require("../modle/cart");
class UserService {
    constructor() {
        this.getAll = async () => {
            let users = await user_1.User.find();
            return users;
        };
        this.checkUser = async (username) => {
            let userCheck = await user_1.User.findOne({ username: username });
            if (!userCheck) {
                return null;
            }
            return userCheck;
        };
        this.checkUsername = async (user) => {
            let usernameCheck = await user_1.User.findOne({ username: user.username });
            if (!usernameCheck) {
                return null;
            }
            return usernameCheck;
        };
        this.registerUser = async (user) => {
            return await user_1.User.create(user);
        };
        this.findBYId = async (id) => {
            let user = await user_1.User.findOne({ _id: id });
            if (!user) {
                return null;
            }
            return user;
        };
        this.orderProduct = async (quantity, product, user) => {
            let cartCheck = await cart_1.Cart.findOne({ status: 'buying', user: user, product: product });
            if (!cartCheck) {
                let cart = {
                    status: 'buying',
                    quantity: quantity,
                    product: product,
                    user: user,
                };
                return await cart_1.Cart.create(cart);
            }
            else {
                cartCheck.quantity += quantity;
                return cart_1.Cart.updateOne({ _id: cartCheck.id }, { quantity: cartCheck.quantity });
            }
        };
        this.findCartByUser = async (user) => {
            let cart = await cart_1.Cart.find({ user: user }).populate('product').populate('user');
            if (!cart) {
                return null;
            }
            return cart;
        };
        this.getAllCart = async () => {
            let cart = await cart_1.Cart.find().populate('product').populate('user');
            return cart;
        };
        this.changeStatusCart = async (user) => {
            let cart = await cart_1.Cart.find({ user: user }).populate('product').populate('user');
            if (!cart) {
                return null;
            }
            else {
                for (let i = 0; i < cart.length; i++) {
                    await cart_1.Cart.updateOne({ _id: cart[i].id }, { status: 'paid' });
                }
                return 'success';
            }
        };
    }
}
exports.default = new UserService();
//# sourceMappingURL=UserService.js.map