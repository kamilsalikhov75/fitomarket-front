import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AuthLayout } from "./components/layouts/AuthLayout";
import { CatalogPage } from "./pages/CatalogPage";
import { PrivateRoute } from "./components/layouts/PrivateRouter";
import { ProfilePage } from "./pages/ProfilePage";
import { CartPage } from "./pages/CartPage";
import { ProfileLayout } from "./components/layouts/ProfileLayout";
import { OrdersPage } from "./pages/OrdersPage";
import { ProductPage } from "./pages/ProductPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      { path: "catalog", element: <CatalogPage /> },
      { path: "catalog/:category", element: <CatalogPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "product/:id", element: <ProductPage /> },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <ProfileLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "me",
            element: <ProfilePage />,
          },
          {
            path: "orders",
            element: <OrdersPage />,
          },
        ],
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
