import { useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { CATEGORIES } from "../meta/categories";
import { useEffect } from "react";
import { getProducts, useProducts } from "../effector/products/productsStore";

export const CatalogPage = () => {
  const { category } = useParams();
  const categoryTitle =
    CATEGORIES.find((item) => item.name === category)?.label || "Каталог";

  const { loading, products } = useProducts();

  useEffect(() => {
    getProducts(category);
  }, [category]);

  return (
    <>
      <h1 className="text-2xl text-secondary font-bold">{categoryTitle}</h1>
      <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-[550px]:grid-cols-1">
        {loading && <div>Загрузка...</div>}
        {!loading && products?.length
          ? products?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))
          : null}
        {!loading && !products?.length && <div>Товаров нет</div>}
      </div>
    </>
  );
};
