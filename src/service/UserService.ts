import {User} from "../modle/user";
import {Cart} from "../modle/cart";
import {Product} from "../modle/product";

class UserService {

    constructor() {
    }

    getAll = async () => {
        let users = await User.find();
        return users
    }
    checkUser = async (username) => {
        let userCheck = await User.findOne({username: username});
        if (!userCheck) {
            return null;
        }
        return userCheck
    }
    checkUsername = async (user) => {
        let usernameCheck = await User.findOne({username: user.username});
        if (!usernameCheck) {
            return null;
        }
        return usernameCheck;
    }
    registerUser = async (user) => {
        return await User.create(user);
    }
    findBYId = async (id) => {
        let user = await User.findOne({_id: id});
        if (!user) {
            return null;
        }
        return user
    }
    private orderProduct = async (quantity, product, user) => {
        let cartCheck = await Cart.findOne({status: 'buying', user: user, product: product});
        if (!cartCheck) {
            let cart = {
                status: 'buying',
                quantity: quantity,
                product: product,
                user: user,
            }
            return await Cart.create(cart);
        } else {

            cartCheck.quantity += quantity;
            return Cart.updateOne({_id: cartCheck.id}, {quantity: cartCheck.quantity})
        }
    }
    findCartByUser = async (user) => {
        let cart = await Cart.find({user: user}).populate('product').populate('user');
        if (!cart) {
            return null;
        }
        return cart
    }
    getAllCart = async () => {
        let cart = await Cart.find().populate('product').populate('user')
        return cart
    }
    changeStatusCart = async (user) => {
        let cart = await Cart.find({user: user}).populate('product').populate('user')
        if (!cart) {
            return null;
        } else {
            for (let i = 0; i < cart.length; i++) {
                await Cart.updateOne({_id: cart[i].id}, {status: 'paid'})
            }
            return 'success'
        }
    }

}

export default new UserService();