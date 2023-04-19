"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = __importDefault(require("../service/UserService"));
const ProductService_1 = __importDefault(require("../service/ProductService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class HomeController {
    constructor() {
        this.showFormLogin = async (req, res) => {
            let error = req.flash().errors || [];
            res.render('users/login', { error: error });
        };
        this.login = async (req, res) => {
            let user = await this.userService.checkUser(req.body.username);
            console.log(user.role === 'admin');
            if (user) {
                let comparePass = await bcrypt_1.default.compare(req.body.password, user.password);
                if (comparePass) {
                    req.session.User = user._id;
                    if (user.role === 'admin') {
                        console.log(1);
                        res.redirect(301, '/home-logined');
                    }
                    else {
                        res.redirect(301, '/home-customer');
                    }
                }
                else {
                    req.flash('error', "Wrong password!!");
                    res.redirect(301, '/users/login');
                }
            }
            else {
                req.flash('error', "wrong username!!");
                res.redirect(301, '/users/login');
            }
        };
        this.showFormRegister = async (req, res) => {
            let error = req.flash().error || [];
            res.render('users/register', { error: error });
        };
        this.register = async (req, res) => {
            let username = await this.userService.checkUsername(req.body);
            if (username) {
                req.flash('error', "username already exists");
                res.redirect(301, '/users/register');
            }
            else {
                let passwordHash = await bcrypt_1.default.hash(req.body.password, 10);
                let newUser = {
                    username: req.body.username,
                    password: passwordHash,
                    role: 'user'
                };
                await this.userService.registerUser(newUser);
                res.redirect(301, '/users/login');
            }
        };
        this.logout = async (req, res) => {
            await req.session.destroy((err) => {
                console.log('Destroyed');
                res.redirect(301, '/home');
            });
        };
        this.orderProduct = async (req, res) => {
            if (req.session.User) {
                let user = await this.userService.findBYId(req.session.User);
                let product = await ProductService_1.default.findById(req.params.id);
                let cart = await this.userService.orderProduct(+req.body.quantity, req.params.id, req.session.User);
                res.redirect(301, '/home-customer');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.showFormCart = async (req, res) => {
            if (req.session.User) {
                let cart = await UserService_1.default.findCartByUser(req.session.User);
                let sum = 0;
                let paid = 0;
                for (let i = 0; i < cart.length; i++) {
                    let product = await ProductService_1.default.findById(cart[i].product);
                    if (cart[i].status === 'buying') {
                        sum += cart[i].quantity * product.price;
                    }
                    else {
                        paid += product.price * cart[i].quantity;
                    }
                }
                res.render('users/cart', { cart: cart, sum: sum, paid: paid });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.payOder = async (req, res) => {
            if (req.session.User) {
                await UserService_1.default.changeStatusCart(req.session.User);
                res.redirect(301, '/users/cart');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.userService = UserService_1.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=UserController.js.map