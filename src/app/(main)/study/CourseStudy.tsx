"use client";
import { TLessonUserStuyding } from "@/_types";
import { CourseGrid, CourseItem } from "@/components/common";
import { ICourse } from "@/databases/corse.model";
import React from "react";

function CourseStudy({ courses }: { courses: ICourse[] }) {
  const coursesStudying: TLessonUserStuyding[] = JSON.parse(
    localStorage.getItem("lastLesson") || "[]"
  );
  return (
    <CourseGrid>
      {courses &&
        courses.length > 0 &&
        courses?.map((item) => {
          const url = coursesStudying.find(
            (c) => c.course === item.slug
          )?.lesson;

          return (
            <CourseItem key={item.slug} data={item} cta="Vào học" url={url} />
          );
        })}
    </CourseGrid>
  );
}

export default CourseStudy;
