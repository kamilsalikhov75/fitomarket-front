import { Outlet } from "react-router-dom";
import { Link } from "../Link";
import { Button } from "@nextui-org/react";
import { logout } from "../../effector/auth/authStore";

export const ProfileLayout = () => {
  return (
    <>
      <div className="flex gap-3 items-center">
        <Link to="/profile/me">Личные данные</Link>
        <Link to="/profile/orders">Заказы</Link>
        <Button variant="light" color="danger" onClick={() => logout()}>
          Выход
        </Button>
      </div>
      <Outlet />
    </>
  );
};
