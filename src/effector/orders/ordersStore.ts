import { createEffect, createStore } from "effector";
import { useUnit } from "effector-react";
import { back, getHeaders } from "../../api/back";
import { OrdersStore } from "./types";
import { Order } from "../cart/types";

export const initialState: OrdersStore = { loading: false };

export const getOrders = createEffect(async () => {
  const { data } = await back.request<Order[]>({
    method: "GET",
    url: `/orders`,
    headers: getHeaders(),
  });

  return data;
});

export const $store = createStore<typeof initialState>(initialState)
  .on(getOrders, (state) => ({
    ...state,
    loading: true,
    orders: [],
  }))
  .on(getOrders.doneData, (state, data) => ({
    ...state,
    loading: false,
    orders: data,
  }));

export const useOrders = () => useUnit($store);
