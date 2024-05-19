import { Link } from "react-router-dom";
import { Logo } from "../icons/Logo";

export const Footer = () => {
  return (
    <footer className="flex justify-center items-center  gap-2 py-2 bg-secondary px-3">
      <Link to="/">
        <Logo textClassName="fill-white" />
      </Link>
    </footer>
  );
};
