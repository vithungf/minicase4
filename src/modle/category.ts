import { Schema, model } from 'mongoose';
export interface ICategory {
    name ?: string;
}

const CategorySchema = new Schema<ICategory> ({
    name: String
})

const Category = model ('Category', CategorySchema);
export {Category};