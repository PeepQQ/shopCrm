"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  activeClassName?: string;
  className?: string;
}

export const NavLink = ({
  href,
  children,
  activeClassName = "active",
  className = "",
  ...props
}: NavLinkProps) => {
  const pathname = usePathname();
  const cleanPathname = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");
  const isActive = cleanPathname === href;

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : ""}`}
      {...props}
    >
      {children}
    </Link>
  );
};
