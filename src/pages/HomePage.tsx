import { HitProducts } from "../components/HitProducts";
import { NewProducts } from "../components/NewProducts";

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-5">
      <HitProducts />
      <NewProducts />
    </div>
  );
};
