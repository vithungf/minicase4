import { Schema, model } from 'mongoose';
import {IUser} from "./user";
export interface ICart {
    status?: string;
    quantity?: number;
    product ?: string;
    user ?: IUser;
}

const CartSchema = new Schema<ICart> ({
    status: String,
    quantity: Number,
    product: {
        type: String,
        ref: 'Product'
    },
    user: {
        type: String,
        ref: 'User'
    }
})

const Cart = model('Cart', CartSchema);
export {Cart};