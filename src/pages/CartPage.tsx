import { Button, Input } from "@nextui-org/react";
import { CartProductCard } from "../components/ProductCard/CartProductCard";
import { createOrder, useCart } from "../effector/cart/cartStore";
import { useAuth } from "../effector/auth/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getLocalStorage, saveToLocalStorage } from "../utils/localStorage";
import { Order } from "../effector/cart/types";

export const CartPage = () => {
  const navigate = useNavigate();
  const { isAuth, user } = useAuth();
  const naviagate = useNavigate();
  const cart = useCart();
  const [address, setAddress] = useState<string>(
    getLocalStorage("address") || ""
  );
  const totalSum = cart.products.reduce((acc, product) => {
    return acc + product.price * product.count;
  }, 0);

  return (
    <>
      <h1 className="text-2xl text-secondary font-bold">Корзина</h1>
      {!cart.products.length ? (
        <p>Корзина пуста</p>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            {cart.products.map((product) => (
              <CartProductCard key={product._id} product={product} />
            ))}
          </div>
          <div>ИТОГО: {totalSum} ₽</div>
          <Input
            value={address}
            placeholder="Адрес доставки"
            onChange={(e) => {
              setAddress(e.target.value);
              saveToLocalStorage("address", e.target.value);
            }}
          />
          <Button
            color="secondary"
            onClick={() => {
              if (isAuth && user?._id) {
                const order: Order = {
                  products: cart.products.map((product) => ({
                    id: product._id,
                    title: product.title,
                    imageUrl: product.imageUrl,
                    count: product.count,
                    price: product.price,
                  })),
                  address,
                  price: totalSum,
                  userId: user?._id,
                };
                createOrder(order).then(() => navigate("/profile/orders"));
              } else {
                naviagate("/auth/login");
              }
            }}
          >
            Оформить заказ
          </Button>
        </div>
      )}
    </>
  );
};
