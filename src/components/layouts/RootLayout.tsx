import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const RootLayout = () => {
  return (
    <div>
      <div className="max-w-[1200px] mx-auto">
        <Header />
        <main className="min-h-[calc(100dvh-130px)] px-3">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
