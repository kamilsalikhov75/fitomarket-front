import clsx from "clsx";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

interface LinkProps extends RouterLinkProps {}

export const Link = ({ children, className, ...props }: LinkProps) => {
  return (
    <RouterLink
      className={clsx("font-bold text-secondary", className)}
      {...props}
    >
      {children}
    </RouterLink>
  );
};
