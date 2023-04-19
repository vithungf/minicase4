"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../modle/product");
class ProductService {
    constructor() {
        this.getAll = async () => {
            let products = await product_1.Product.find().populate('category');
            return products;
        };
        this.save = async (product) => {
            return product_1.Product.create(product);
        };
        this.update = async (id, newProduct) => {
            let product = await product_1.Product.findOne({ _id: id });
            if (!product) {
                return null;
            }
            try {
                let a = await product_1.Product.updateOne({ _id: product._id }, newProduct);
                console.log(a);
            }
            catch (error) {
                console.log(error);
            }
            return true;
        };
        this.findById = async (id) => {
            let product = await product_1.Product.findOne({ _id: id }).populate('category');
            if (!product) {
                return null;
            }
            return product;
        };
        this.remove = async (id) => {
            let product = await product_1.Product.findOne({ _id: id });
            if (!product) {
                return null;
            }
            return product.deleteOne({ _id: id });
        };
        this.search = async (name) => {
            let products = await product_1.Product.find({ name: { $regex: name } }).populate('category');
            if (!products) {
                return null;
            }
            return products;
        };
    }
}
exports.default = new ProductService();
//# sourceMappingURL=ProductService.js.map