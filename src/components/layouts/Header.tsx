import { useState } from "react";
import { useAuth } from "../../effector/auth/authStore";
import { CATEGORIES } from "../../meta/categories";
import { Link } from "../Link";
import { CartIcon } from "../icons/CartIcon";
import { Logo } from "../icons/Logo";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

export const Header = () => {
  const auth = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar
      className="bg-primary"
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to="/">
            <Logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {CATEGORIES.map(({ name, label }) => (
          <NavbarItem key={name}>
            <Link to={`/catalog/${name}`}>{label}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {auth.isAuth ? (
          <NavbarItem>
            <Link to="/profile/me">Профиль</Link>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              {" "}
              <Link to="/auth/login">Войти</Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/auth/register">Регистрация</Link>
            </NavbarItem>
          </>
        )}
        <NavbarItem>
          {" "}
          <Link to="/cart">
            <CartIcon />
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {CATEGORIES.map(({ name, label }) => (
          <NavbarMenuItem key={name}>
            <Link to={`/catalog/${name}`}>{label}</Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
