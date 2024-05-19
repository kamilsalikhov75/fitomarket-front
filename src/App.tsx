import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMe, useAuth } from "./effector/auth/authStore";
import { useEffect } from "react";
import Cookies from "js-cookie";

function App() {
  const { isAuth, user } = useAuth();
  useEffect(() => {
    if (Cookies.get("token") && !user) getMe();
  }, [isAuth, user]);

  return (
    <NextUIProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </NextUIProvider>
  );
}

export default App;
