"use client";
import { TMenuLink } from "@/_types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function MenuLink({ href, title, icon }: TMenuLink) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex px-5 py-4 items-center gap-6 dark:text-grayDark rounded-lg transition-all ${
        isActive
          ? "!text-white bg-primary svg-animate"
          : "hover:!bg-primary hover:!bg-opacity-10  hover:!text-primary"
      }`}
    >
      {icon}
      <span className="text-base">{title}</span>
    </Link>
  );
}

export default MenuLink;
