import { createEffect, createStore } from "effector";
import { useUnit } from "effector-react";
import { back, getHeaders } from "../../api/back";
import { Product, ProductsStore } from "./types";

export const initialState: ProductsStore = { loading: false };

export const getProducts = createEffect(async (category?: string) => {
  const { data } = await back.request<Product[]>({
    method: "GET",
    url: `/products`,
    headers: getHeaders(),
  });

  if (category) {
    return data.filter((product) => product.category === category);
  }

  return data;
});

export const getHitProducts = createEffect(async (category?: string) => {
  const { data } = await back.request<Product[]>({
    method: "GET",
    url: `/products/hit`,
    headers: getHeaders(),
  });

  if (category) {
    return data.filter((product) => product.category === category);
  }

  return data;
});
export const getNewProducts = createEffect(async (category?: string) => {
  const { data } = await back.request<Product[]>({
    method: "GET",
    url: `/products/new`,
    headers: getHeaders(),
  });

  if (category) {
    return data.filter((product) => product.category === category);
  }

  return data;
});

export const getProduct = createEffect(async (id: string) => {
  const { data } = await back.request<Product>({
    method: "GET",
    url: `/products/${id}`,
    headers: getHeaders(),
  });

  return data;
});

export const $store = createStore<typeof initialState>(initialState)
  .on(getProducts, (state) => ({
    ...state,
    loading: true,
    products: [],
  }))
  .on(getProducts.doneData, (state, data) => ({
    ...state,
    loading: false,
    products: data,
  }))
  .on(getProduct, (state) => ({
    ...state,
    loading: true,
    currentProduct: undefined,
  }))
  .on(getProduct.doneData, (state, data) => ({
    ...state,
    loading: false,
    currentProduct: data,
  }))
  .on(getHitProducts.doneData, (state, data) => ({
    ...state,
    loading: false,
    hit: data,
  }))
  .on(getNewProducts.doneData, (state, data) => ({
    ...state,
    loading: false,
    new: data,
  }));

export const useProducts = () => useUnit($store);
