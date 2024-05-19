import { useEffect } from "react";
import {
  getHitProducts,
  useProducts,
} from "../effector/products/productsStore";
import { ProductCard } from "./ProductCard/ProductCard";

export const HitProducts = () => {
  const { hit } = useProducts();

  useEffect(() => {
    getHitProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-secondary font-bold">Хиты продаж</h1>
      {hit && (
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-[550px]:grid-cols-1">
          {hit?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
