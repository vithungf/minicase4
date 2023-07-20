import {Router} from 'express'
import HomeController from '../controller/HomeController';
import homeController from "../controller/HomeController";
import {productRouter} from "./product-router";
import {userRouter} from "./user-router";
import userController from "../controller/UserController";


export const router = Router();
router.get('/home', HomeController.showHome)
router.get('/home-logined', HomeController.showHomeLogined)
router.get('/home-customer',homeController.showHomeCustomer)
router.post('/home-customer', userController.priceRange);

router.use('/products',productRouter)
router.use('/users',userRouter)
