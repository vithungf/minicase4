import {Product} from "../modle/product";
import {Category} from "../modle/category";

class ProductService{
    constructor(){

    }
    getAll = async()=>{
        let products = await Product.find().populate('category')
        return products
    }
     save = async(product)=>{
        return Product.create(product)
    }

    private update = async (id,newProduct)=>{
        let product =  await Product.findOne({_id: id});
        if(!product){
            return null;
        }
        try{
            let a = await Product.updateOne({_id: product._id},newProduct);
            console.log(a)
        }catch (error){
            console.log(error);
        }
        return true;
    }
    findById = async (id)=>{
        let product = await Product.findOne({_id: id}).populate('category');
        console.log(product)
        if (!product){
            return null;
        }
        return product;
    }
    private remove = async (id)=>{
        let product = await Product.findOne({_id: id});
        if (!product){
            return null;
        }
        return product.deleteOne({_id:id});
    }
    search = async (name)=> {
        let products = await Product.find({name: {$regex: name}}).populate('category');
        if (!products) {
            return null;
        }
        return products
    }

    priceRange = async (start, end) => {
        let products = await Product.find({ $and: [{price: {$gte: start}}, {price: {$lte: end}}]}).populate('category');
        if (!products) {
            return null;
        }
        return products;
    }
    priceRange1 = async (value) => {
        let products;
        switch (value) {
            case 99:
                products = await Product.find({ $and: [{price: {$gte: 0}}, {price: {$lte: value}}]}).populate('category');
                if (!products) {
                    return null;
                }
                return products;
            case 499:
                products = await Product.find({ $and: [{price: {$gte: 100}}, {price: {$lte: value}}]}).populate('category');
                if (!products) {
                    return null;
                }
                return products;
            case 999:
                products = await Product.find({ $and: [{price: {$gte: 500}}, {price: {$lte: value}}]}).populate('category');
                if (!products) {
                    return null;
                }
                return products;
            case 1999:
                products = await Product.find({ $and: [{price: {$gte: 1000}}, {price: {$lte: value}}]}).populate('category');
                if (!products) {
                    return null;
                }
                return products;
            default:
                return products = await Product.find().populate('category');
        }
    }


}
export default new ProductService();