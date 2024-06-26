import CourseManage from "@/components/common/Course/CourseManage";
import { getAllCourses } from "@/lib/actions/course.action";
import React from "react";

async function ManageCoursePage() {
  const courses = await getAllCourses();

  if (!courses) return null;

  return (
    <div>
      <CourseManage courses={JSON.parse(JSON.stringify(courses))} />
    </div>
  );
}

export default ManageCoursePage;
