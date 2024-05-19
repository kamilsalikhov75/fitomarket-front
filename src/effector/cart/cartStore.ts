import { createApi, createEffect, createStore } from "effector";
import { useUnit } from "effector-react";
import { CartStore, Order } from "./types";
import { Product } from "../products/types";
import { getLocalStorage, saveToLocalStorage } from "../../utils/localStorage";
import { back, getHeaders } from "../../api/back";

const cart = JSON.parse(getLocalStorage("cart") || '{"products":[]}');

export const initialState: CartStore = cart;

export const createOrder = createEffect(async (order: Order) => {
  const { data } = await back.request<Product>({
    method: "POST",
    url: `/orders`,
    headers: getHeaders(),
    data: order,
  });

  return data;
});

export const $store = createStore<typeof initialState>(initialState).on(
  createOrder.doneData,
  () => {
    saveToLocalStorage("cart", JSON.stringify({ products: [] }));
    return { products: [] };
  }
);

export const { addToCart, removeFromCart, plusProduct, minusProduct } =
  createApi($store, {
    addToCart: (state, product: Product) => {
      const data = { products: [...state.products, { ...product, count: 1 }] };
      saveToLocalStorage("cart", JSON.stringify(data));
      return data;
    },
    removeFromCart: (state, id) => {
      const data = {
        products: state.products.filter((product) => product._id !== id),
      };
      saveToLocalStorage("cart", JSON.stringify(data));
      return data;
    },
    plusProduct: (state, id) => {
      const data = {
        products: state.products.map((product) =>
          product._id === id
            ? { ...product, count: product.count + 1 }
            : product
        ),
      };
      saveToLocalStorage("cart", JSON.stringify(data));
      return data;
    },
    minusProduct: (state, id) => {
      const data = {
        products: state.products.map((product) =>
          product._id === id
            ? { ...product, count: product.count - 1 }
            : product
        ),
      };
      saveToLocalStorage("cart", JSON.stringify(data));
      return data;
    },
  });

export const useCart = () => useUnit($store);
