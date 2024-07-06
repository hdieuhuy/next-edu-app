"use client";
import { TLessonUserStuyding } from "@/_types";
import { useEffect } from "react";

function LessonSaveUrl({ url, course }: { url: string; course: string }) {
  useEffect(() => {
    let results: TLessonUserStuyding[] =
      JSON.parse(localStorage?.getItem("lastLesson") || "[]") || [];
    const item: TLessonUserStuyding = {
      course,
      lesson: url,
    };
    results = results.filter((item) => item.course !== course);
    results.push(item);
    localStorage?.setItem("lastLesson", JSON.stringify(results));
  }, [course, url]);
  return null;
}

export default LessonSaveUrl;
