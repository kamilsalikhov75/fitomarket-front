import { useEffect } from "react";
import {
  getNewProducts,
  useProducts,
} from "../effector/products/productsStore";
import { ProductCard } from "./ProductCard/ProductCard";

export const NewProducts = () => {
  const { new: newProducts } = useProducts();

  useEffect(() => {
    getNewProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-secondary font-bold">Новинки</h1>
      {newProducts && (
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-[550px]:grid-cols-1">
          {newProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
