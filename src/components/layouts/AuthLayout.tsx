import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useAuth } from "../../effector/auth/authStore";
import { useEffect } from "react";

export const AuthLayout = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div>
      <div className="max-w-[1200px] mx-auto">
        <Header />
        <main className="min-h-[calc(100dvh-130px)] px-3 flex flex-col justify-center">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
