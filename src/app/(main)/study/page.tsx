import { CourseGrid, CourseItem, Heading } from "@/components/common";
import { getUserCourses } from "@/lib/actions/user.action";
import React from "react";
import CourseStudy from "./CourseStudy";

async function StudyPage() {
  const courses = await getUserCourses();

  return (
    <>
      <Heading>Khu vực học tập</Heading>

      <CourseStudy courses={JSON.parse(JSON.stringify(courses))} />
    </>
  );
}

export default StudyPage;
