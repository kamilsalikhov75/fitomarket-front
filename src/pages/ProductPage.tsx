import { useEffect } from "react";
import { getProduct, useProducts } from "../effector/products/productsStore";
import { useParams } from "react-router-dom";
import { Image } from "@nextui-org/react";
import { CartButton } from "../components/CartButton";

export const ProductPage = () => {
  const { id } = useParams();
  const { loading, currentProduct } = useProducts();

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, [id]);

  return (
    <>
      {loading && "Loading..."}
      {!loading && currentProduct && (
        <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
          <Image
            width="100%"
            src={`${import.meta.env.VITE_API_URL}${currentProduct.imageUrl}`}
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl text-secondary font-bold">
              {currentProduct.title}
            </h1>
            <p>{currentProduct.description}</p>
            <div>Цена: {currentProduct.price} ₽</div>
            <CartButton product={currentProduct} />
          </div>
        </div>
      )}
    </>
  );
};
