import {Request, Response} from "express";
import productService from "../service/ProductService";
import categoryService from "../service/CategoryService";
import ProductService from "../service/ProductService";
import CategoryService from "../service/CategoryService";

class HomeController {

    private productService;
    private categoryService;

    constructor() {
        this.productService = ProductService;
        this.categoryService = CategoryService;
    }

    showHome = async (req: Request, res: Response) => {
        let products = await productService.getAll();
        res.render('home', {products: products})
    }
    test = async (req: Request, res: Response) => {
        let categories = await categoryService.getAll();
        res.render('products/create', {categories: categories})
    }
    showHomeLogined = async (req: Request, res: Response) => {
        if (req.session.User) {
            let products = await productService.getAll();
            res.render('homeLogined', {products: products})
        } else {
            res.redirect(301, '/users/login')
        }
    }
    showHomeCustomer = async (req: Request, res: Response) => {
        if (req.session.User) {
            let products = await productService.getAll();
            res.render('homeCustomer', {products: products})
        } else {
            res.redirect(301, '/users/login')
        }
    }
    showFormCreate = async (req: Request, res: Response) => {
        console.log(1)
        console.log(req.session.User)
        if (req.session.User) {

            let categories = await categoryService.getAll()
            res.render('products/create', {categories: categories});
        } else {
            console.log(req.session.User)
            res.redirect(301, '/users/login')
        }
    }

    createProduct = async (req: Request, res: Response) => {
        this.productService.save(req.body);
        res.redirect(301, '/home-logined')

    }
    showFormDelete = async (req: Request, res: Response) => {
        if (req.session.User) {
            let idDelete = req.params.id;
            res.render('products/delete', {idDelete: idDelete})
        } else {
            res.redirect(301, '/users/login')
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            await this.productService.remove(id);
            res.redirect(301, '/home-logined')
        } else {
            res.redirect(301, 'users/login')
        }
    }
    showFormUpdate = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id;
            let product = await productService.findById(id);
            let categories = await categoryService.getAll()
            res.render('products/edit', {product: product, categories: categories})
        } else {
            res.redirect(301, '/users/login')
        }
    }
    updateProduct = async (req: Request, res: Response) => {
        if (req.session.User) {
            let id = req.params.id
            let updateProduct = req.body
            try {
                let product = await this.productService.update(id, updateProduct)
            }catch (err) {console.log(err)}
            res.redirect(301, '/home-logined')
        }else{
            res.redirect(301, '/users/login')
        }
    }

    searchProduct = async (req: Request, res: Response) => {
        let products = await productService.search(req.body.search);
        res.render('homeCustomer', {products: products})
    }
    showFormDetail = async (req: Request, res: Response) => {
        if(req.session.User){
            let product = await productService.findById(req.params.id);
            res.render('products/detail', {product: product})
        }else{
            res.redirect(301,'/users/login')
        }
    }
}

export default new HomeController();
