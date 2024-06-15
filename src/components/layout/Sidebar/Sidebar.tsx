import { BookIcon } from "@/components/icons";
import { MenuLink } from "@/components/common";
import { menuItems } from "@/constants";
import Link from "next/link";
import React from "react";

function Sidebar() {
  return (
    <div className="py-5 px-8 bg-white dark:border-opacity-10 dark:bg-grayDarker">
      <Link href="/" className="logo flex gap-2 mb-8">
        <BookIcon className="size-8 text-primary" />

        <span className="font-bold text-primary text-2xl">HeroEdu</span>
      </Link>

      <ul className="flex flex-col gap-4">
        {menuItems.map((item, index) => (
          <MenuLink
            href={item.href}
            title={item.title}
            icon={item.icon}
            key={`menu-item-${index}`}
          />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
