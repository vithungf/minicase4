"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductService_1 = __importDefault(require("../service/ProductService"));
const CategoryService_1 = __importDefault(require("../service/CategoryService"));
const ProductService_2 = __importDefault(require("../service/ProductService"));
const CategoryService_2 = __importDefault(require("../service/CategoryService"));
class HomeController {
    constructor() {
        this.showHome = async (req, res) => {
            let products = await ProductService_1.default.getAll();
            res.render('home', { products: products });
        };
        this.test = async (req, res) => {
            let categories = await CategoryService_1.default.getAll();
            res.render('products/create', { categories: categories });
        };
        this.showHomeLogined = async (req, res) => {
            if (req.session.User) {
                let products = await ProductService_1.default.getAll();
                res.render('homeLogined', { products: products });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.showHomeCustomer = async (req, res) => {
            if (req.session.User) {
                let products = await ProductService_1.default.getAll();
                res.render('homeCustomer', { products: products });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.showFormCreate = async (req, res) => {
            console.log(1);
            console.log(req.session.User);
            if (req.session.User) {
                let categories = await CategoryService_1.default.getAll();
                res.render('products/create', { categories: categories });
            }
            else {
                console.log(req.session.User);
                res.redirect(301, '/users/login');
            }
        };
        this.createProduct = async (req, res) => {
            this.productService.save(req.body);
            res.redirect(301, '/home-logined');
        };
        this.showFormDelete = async (req, res) => {
            if (req.session.User) {
                let idDelete = req.params.id;
                res.render('products/delete', { idDelete: idDelete });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.deleteProduct = async (req, res) => {
            if (req.session.User) {
                let id = req.params.id;
                await this.productService.remove(id);
                res.redirect(301, '/home-logined');
            }
            else {
                res.redirect(301, 'users/login');
            }
        };
        this.showFormUpdate = async (req, res) => {
            if (req.session.User) {
                let id = req.params.id;
                let product = await ProductService_1.default.findById(id);
                let categories = await CategoryService_1.default.getAll();
                res.render('products/edit', { product: product, categories: categories });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.updateProduct = async (req, res) => {
            if (req.session.User) {
                let id = req.params.id;
                let updateProduct = req.body;
                try {
                    let product = await this.productService.update(id, updateProduct);
                }
                catch (err) {
                    console.log(err);
                }
                res.redirect(301, '/home-logined');
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.searchProduct = async (req, res) => {
            let products = await ProductService_1.default.search(req.body.search);
            res.render('homeCustomer', { products: products });
        };
        this.showFormDetail = async (req, res) => {
            if (req.session.User) {
                let product = await ProductService_1.default.findById(req.params.id);
                res.render('products/detail', { product: product });
            }
            else {
                res.redirect(301, '/users/login');
            }
        };
        this.productService = ProductService_2.default;
        this.categoryService = CategoryService_2.default;
    }
}
exports.default = new HomeController();
//# sourceMappingURL=HomeController.js.map