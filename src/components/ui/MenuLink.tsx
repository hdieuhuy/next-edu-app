import Link from "next/link";
import React from "react";

interface MenuLinkProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

function MenuLink({ href, title, icon }: MenuLinkProps) {
  return (
    <Link
      href={href}
      className="flex px-5 py-4 items-center gap-6 rounded hover:bg-primary hover:bg-opacity-10  hover:text-primary transition-all"
    >
      {icon}
      {title}
    </Link>
  );
}

export default MenuLink;
