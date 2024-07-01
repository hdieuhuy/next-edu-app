import React from "react";
import { Header, Sidebar } from "@/components/layout";
import { menuItems } from "@/constants";
import { MenuLink } from "@/components/common";

function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrapper h-screen grid lg:grid-cols-[300px_minmax(0,1fr)]">
      <Sidebar />

      <ul className="flex p-3 bgDarkMode border-t borderDarkMode lg:hidden fixed bottom-0 left-0 w-full justify-center gap-5 h-16">
        {menuItems.map((item, index) => (
          <MenuLink
            href={item.href}
            title={item.title}
            icon={item.icon}
            key={`menu-item-${index}`}
            onlyIcon
          />
        ))}
      </ul>

      <div className="hidden lg:block" />

      <div className="">
        <Header />
        <main className="px-8 py-4 bg-slate-100 dark:border-opacity-10 dark:bg-grayDarkest">
          {children}
        </main>
      </div>
    </div>
  );
}

export default UserLayout;
