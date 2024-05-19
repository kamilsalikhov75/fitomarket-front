import { Button, Image } from "@nextui-org/react";
import { CartProduct } from "../../effector/cart/types";
import { CartCrossIcon } from "../icons/CartCrossIcon";
import {
  minusProduct,
  plusProduct,
  removeFromCart,
} from "../../effector/cart/cartStore";

interface CartProductCardProps {
  product: CartProduct;
}

export const CartProductCard = ({ product }: CartProductCardProps) => {
  return (
    <div className="flex items-center justify-between max-[700px]:flex-col">
      <Image
        src={`${import.meta.env.VITE_API_URL}${product.imageUrl}`}
        width={60}
      />
      <div>
        <h3 className="max-w-[350px] truncate">{product.title}</h3>
      </div>
      <div className="flex items-center gap-2 max-[700px]:justify-between">
        {product.count === 1 && (
          <Button color="secondary" onClick={() => removeFromCart(product._id)}>
            <CartCrossIcon />
          </Button>
        )}
        {product.count > 1 && (
          <Button color="secondary" onClick={() => minusProduct(product._id)}>
            - 1
          </Button>
        )}
        <div className="bg-red">{product.count}</div>
        <Button color="secondary" onClick={() => plusProduct(product._id)}>
          + 1
        </Button>
        x {product.price}₽ = {product.price * product.count} ₽
      </div>
    </div>
  );
};
