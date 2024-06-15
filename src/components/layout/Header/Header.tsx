"use client";
import React from "react";
import Link from "next/link";
import { ToggleTheme } from "@/components/common";
import { UserButton, useAuth } from "@clerk/nextjs";
import { UserIcon } from "lucide-react";

function Header() {
  const { userId } = useAuth();

  return (
    <div className="sticky top-0 z-50 w-full flex justify-between items-center py-4 px-8 bg-white dark:border-opacity-10 dark:bg-grayDarker">
      <div>Search Iput</div>

      <div className="flex items-center gap-4">
        {!userId ? (
          <Link
            href="/sign-in"
            className="size-10 rounded-lg bg-primary text-white flex items-center justify-center p-1"
          >
            <UserIcon />
          </Link>
        ) : (
          <UserButton />
        )}

        <ToggleTheme />
      </div>
    </div>
  );
}

export default Header;
