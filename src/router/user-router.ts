import {Router} from 'express';
import userController from "../controller/UserController";

export const userRouter = Router();

userRouter.get('/login',userController.showFormLogin)
userRouter.post('/login',userController.login)
userRouter.get('/logout',userController.logout)
userRouter.get('/register',userController.showFormRegister)
userRouter.post('/register',userController.register)
userRouter.get('/cart',userController.showFormCart)
userRouter.post('/order/:id',userController.orderProduct)
