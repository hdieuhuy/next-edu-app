import { BookIcon } from "@/components/icons";
import DocumentIcon from "@/components/icons/DocumentIcon";
import MenuLink from "@/components/ui/MenuLink";
import { menuItems } from "@/constants";
import React from "react";

function Sidebar() {
  return (
    <div className="p-8 border-r-2 border-r-slate-100">
      <div className="logo flex gap-2 mb-10">
        <BookIcon className="size-8 text-primary" />

        <span className="text-primary text-bold text-2xl">HeroEdu</span>
      </div>

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
