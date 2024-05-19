import { API } from "./instance";
import Cookies from "js-cookie";

export const back = new API({
  baseUrl: import.meta.env.VITE_API_URL,
});

export const getHeaders = () => {
  return { Authorization: `Bearer ${Cookies.get("token")}` };
};
