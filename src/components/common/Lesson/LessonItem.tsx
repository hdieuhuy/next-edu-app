"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { createHistory } from "@/lib/actions/history.action";
import { cn } from "@/utils";
import { PlayCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function LessonItem({
  lesson,
  url,
  isActive,
  isChecked = false,
}: {
  lesson: {
    title: string;
    duration: number;
    course: string;
    _id: string;
  };
  url?: string;
  isActive?: boolean;
  isChecked?: boolean;
}) {
  async function handleCompleteLesson(checked: boolean | string) {
    try {
      await createHistory({
        course: lesson.course,
        lesson: lesson._id,
        checked,
        slug: url,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className={cn(
        "flex items-center gap-2 bgDarkMode border borderDarkMode rounded-lg p-4 font-medium text-sm",
        isActive ? "text-primary font-semibold" : ""
      )}
    >
      {url && (
        <Checkbox
          defaultChecked={isChecked}
          className="size-4 flex-shrink-0"
          onCheckedChange={(checked) => handleCompleteLesson(checked)}
        />
      )}
      <PlayCircleIcon />
      {url ? (
        <Link href={url} className="line-clamp-1 pointer-events-none">
          {lesson.title}
        </Link>
      ) : (
        <h4 className="line-clamp-1 pointer-events-none">{lesson.title}</h4>
      )}
      <span className="ml-auto text-xs font-semibold flex-shrink-0">
        {lesson.duration} phút
      </span>
    </div>
  );
}

export default LessonItem;
