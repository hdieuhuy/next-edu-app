import React, { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import PageNotFound from "@/app/not-found";
import { getUser } from "@/lib/actions/user.action";
import LoadingPlayer from "./@player/LoadingPlayer";
import LoadingOutline from "./@outline/LoadingOutline";

async function LessonLayout({
  player,
  outline,
}: {
  player: React.ReactNode;
  outline: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) return <PageNotFound />;
  const findUser = await getUser(userId);
  if (!findUser) return <PageNotFound />;
  // if (!findUser.courses.includes(courseId as any)) return <PageNotFound />;

  return (
    <div className="grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start">
      <Suspense fallback={<LoadingPlayer />}>{player}</Suspense>
      <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
    </div>
  );
}

export default LessonLayout;
