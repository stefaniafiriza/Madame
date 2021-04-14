import {CartProduct} from '../models/cart-product';

export interface User {
    Name: string;
    password: string;
    phone: number;
    email: string;
    address: string;
    products: CartProduct[];
    photo: string;
}