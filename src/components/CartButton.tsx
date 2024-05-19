import { Button } from "@nextui-org/react";
import {
  addToCart,
  plusProduct,
  removeFromCart,
  useCart,
} from "../effector/cart/cartStore";
import { Product } from "../effector/products/types";

interface CartButtonProps {
  product: Product;
}

export const CartButton = ({ product }: CartButtonProps) => {
  const { products } = useCart();
  const cartProduct = products.find((item) => item._id === product._id);
  return (
    <div className="flex items-center gap-2">
      {!cartProduct?.count ? (
        <Button
          color="secondary"
          onClick={() => addToCart(product)}
          className="w-full"
        >
          Добавить в корзину
        </Button>
      ) : (
        cartProduct?.count > 0 && (
          <>
            <Button
              onClick={() => removeFromCart(product._id)}
              className="w-full"
              color="secondary"
            >
              Удалить из корзины
            </Button>
            <Button onClick={() => plusProduct(product._id)} color="secondary">
              + 1
            </Button>
          </>
        )
      )}
    </div>
  );
};
