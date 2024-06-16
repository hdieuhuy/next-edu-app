import React from "react";
import { Header, Sidebar } from "@/components/layout";

function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen grid grid-cols-[300px_minmax(0,1fr)]">
      <Sidebar />

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
