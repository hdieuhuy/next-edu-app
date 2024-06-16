import { EUserRole } from "@/_types/enums";
import NotFoundPage from "@/app/not-found";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (!userId) return redirect("/sign-in");

  const user = await getUser(userId);

  if (user && user.role !== EUserRole.ADMIN) return <NotFoundPage />;

  return <div>{children}</div>;
}

export default AdminLayout;
