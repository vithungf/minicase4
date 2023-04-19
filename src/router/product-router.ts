import {Router} from 'express'
import homeController from "../controller/HomeController";

export const productRouter = Router();

productRouter.get('/createProduct',homeController.showFormCreate);
productRouter.post('/create',homeController.createProduct);
productRouter.get('/delete/:id',homeController.showFormDelete);
productRouter.post('/delete/:id',homeController.deleteProduct);
productRouter.get('/edit/:id',homeController.showFormUpdate);
productRouter.post('/edit/:id',homeController.updateProduct);
productRouter.post('/search/',homeController.searchProduct);
productRouter.get('/detail/:id',homeController.searchProduct)

