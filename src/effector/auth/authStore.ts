import { createApi, createEffect, createStore } from "effector";
import { useUnit } from "effector-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { back, getHeaders } from "../../api/back";
import { AuthStore } from "./types";

export const initialState: AuthStore = { isAuth: false };

export const login = createEffect(
  async (data: { email: string; password: string }) => {
    const { data: responseData } = await back.request<{
      token: string;
    }>({
      method: "POST",
      url: "/auth/login",
      data,
    });

    const tokenExpires = new Date(
      (jwtDecode(responseData.token).exp as number) * 1000
    );

    Cookies.set("token", responseData.token, {
      expires: tokenExpires,
    });
  }
);

export const register = createEffect(
  async (data: { name: string; email: string; password: string }) => {
    const { data: responseData } = await back.request<{
      token: string;
    }>({
      method: "POST",
      url: "/auth/register",
      data,
    });

    const tokenExpires = new Date(
      (jwtDecode(responseData.token).exp as number) * 1000
    );

    Cookies.set("access_token", responseData.token, {
      expires: tokenExpires,
    });
  }
);

export const getMe = createEffect(async () => {
  const { data } = await back.request({
    method: "GET",
    url: `/auth/user`,
    headers: getHeaders(),
  });

  return data.userData;
});

export const $store = createStore<typeof initialState>(initialState)
  .on(login.doneData, (state) => ({ ...state, isAuth: true }))
  .on(register.doneData, (state) => {
    toast.success("Вы успешно зарегистрировались!");
    return { ...state, isAuth: true };
  })
  .on(getMe.doneData, (state, user) => ({ ...state, isAuth: true, user }));

export const { logout } = createApi($store, {
  logout: (state) => {
    Cookies.remove("token");
    return { ...state, isAuth: false, user: undefined };
  },
});
export const useAuth = () => useUnit($store);
