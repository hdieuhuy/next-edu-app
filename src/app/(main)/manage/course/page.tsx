import { ECourseStatus } from "@/_types/enums";
import CourseManage from "@/components/common/Course/CourseManage";
import { getAllCourses } from "@/lib/actions/course.action";
import React from "react";

async function ManageCoursePage({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: ECourseStatus;
  };
}) {
  const courses = await getAllCourses({
    params: {
      limit: 10,
      page: searchParams.page || 1,
      search: searchParams.search || "",
      status: searchParams.status || ECourseStatus.APPROVED,
    },
  });

  if (!courses) return null;

  return (
    <div>
      <CourseManage courses={JSON.parse(JSON.stringify(courses))} />
    </div>
  );
}

export default ManageCoursePage;
