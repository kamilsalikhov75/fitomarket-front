import { useEffect } from "react";
import { useAuth } from "../../effector/auth/authStore";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/auth/login");
    }
  }, [isAuth, navigate]);

  return <>{children}</>;
};
