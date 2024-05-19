import { Product } from "../products/types";

export interface CartProduct extends Product {
  count: number;
}
export interface CartStore {
  products: CartProduct[];
}

export interface Order {
  products: {
    id: string;
    title: string;
    imageUrl: string;
    count: number;
    price: number;
  }[];
  userId: string;
  price: number;
  address: string;
}
