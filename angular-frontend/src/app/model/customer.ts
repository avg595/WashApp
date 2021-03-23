import { Cart } from './cart';

export class Customer {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    cart: Cart;
}
