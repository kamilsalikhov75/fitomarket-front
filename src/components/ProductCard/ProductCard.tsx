import { Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Product } from "../../effector/products/types";
import { CartButton } from "../CartButton";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Link to={`/product/${product._id}`}>
        <Image
          src={`${import.meta.env.VITE_API_URL}${product.imageUrl}`}
          width="100%"
        />
        <h3 className="text-secondary truncate">{product.title}</h3>
        <p className="truncate">{product.description}</p>
      </Link>
      <div>Цена: {product.price} ₽</div>
      <CartButton product={product} />
    </div>
  );
};
