import { ToggleTheme } from "@/components/common";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function Header() {
  return (
    <div className="sticky top-0 z-50 w-full flex justify-between items-center py-4 px-8 bg-white dark:border-opacity-10 dark:bg-grayDarkest">
      <div>Search Iput</div>

      <div className="flex items-center gap-4">
        <UserButton />

        <ToggleTheme />
      </div>
    </div>
  );
}

export default Header;
