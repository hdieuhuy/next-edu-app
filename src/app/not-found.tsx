import Image from "next/image";
import React from "react";

import NotFoundPNG from "@/assets/jpg/404.jpg";
import { ArrowLeftIcon } from "@/components/icons";
import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <Image src={NotFoundPNG} alt="404 not found" className="w-[380px]" />
      <p className="font-semibold text-3xl mb-4">Page Not Found</p>
      <Link
        href={"/"}
        className="flex items-center gap-2 hover:text-primary cursor-pointer transition-all"
      >
        <ArrowLeftIcon />
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
