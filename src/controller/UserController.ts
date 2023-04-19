import {Request, Response} from "express";
import userService from "../service/UserService";
import productService from "../service/ProductService";

import bcrypt from 'bcrypt';

declare module "express-session" {
    interface SessionData {
        User: { [key: string]: any }
    }
}

class HomeController {

    private userService;

    constructor() {
        this.userService = userService
    }

    showFormLogin = async (req: Request, res: Response) => {
        let error = req.flash().errors || [];
        res.render('users/login', {error: error})
    }
    login = async (req: Request, res: Response) => {
        let user = await this.userService.checkUser(req.body.username);
        console.log(user.role === 'admin')
        if (user) {
            let comparePass = await bcrypt.compare(req.body.password, user.password)
            if (comparePass) {
                req.session.User = user._id;
                if (user.role === 'admin') {
                    console.log(1)
                    res.redirect(301, '/home-logined')
                } else {
                    res.redirect(301, '/home-customer')
                }
            } else {
                req.flash('error', "Wrong password!!")
                res.redirect(301, '/users/login')
            }

        } else {
            req.flash('error', "wrong username!!")
            res.redirect(301, '/users/login')
        }
    }
    showFormRegister = async (req: Request, res: Response) => {
        let error = req.flash().error || [];
        res.render('users/register', {error: error});
    }
    register = async (req: Request, res: Response) => {
        let username = await this.userService.checkUsername(req.body);
        if (username) {
            req.flash('error', "username already exists")
            res.redirect(301, '/users/register')
        } else {
            let passwordHash = await bcrypt.hash(req.body.password, 10);
            let newUser = {
                username: req.body.username,
                password: passwordHash,
                role: 'user'
            }
            await this.userService.registerUser(newUser)
            res.redirect(301, '/users/login')
        }
    }
    logout = async (req: Request, res: Response) => {
        await req.session.destroy((err) => {
            console.log('Destroyed')
            res.redirect(301, '/home')
        })
    }
    orderProduct = async (req: Request, res: Response) => {
        if (req.session.User) {
            let user = await this.userService.findBYId(req.session.User)
            let product = await productService.findById(req.params.id)
            let cart = await this.userService.orderProduct(+req.body.quantity, req.params.id, req.session.User)
            res.redirect(301, '/home-customer')

        } else {
            res.redirect(301, '/users/login')
        }
    }
    showFormCart = async (req: Request, res: Response) => {
        if (req.session.User) {
            let cart = await userService.findCartByUser(req.session.User);
            let sum = 0;
            let paid = 0;
            for (let i = 0; i < cart.length; i++) {
                let product = await productService.findById(cart[i].product)
                if (cart[i].status === 'buying') {
                    sum += cart[i].quantity * product.price;
                } else {
                    paid += product.price * cart[i].quantity
                }
            }
            res.render('users/cart', {cart: cart,sum: sum,paid: paid});

        }else {
            res.redirect(301,'/users/login')
        }
    }
    payOder = async (req:Request, res:Response) => {
        if (req.session.User) {
            await userService.changeStatusCart(req.session.User)
            res.redirect(301,'/users/cart')
        }else {
            res.redirect(301,'/users/login')
        }
    }


}

export default new HomeController()