import React from "react";

import { CourseGrid, CourseItem, Heading } from "@/components/common";
import { getAllCourses } from "@/lib/actions/course.action";

export default async function Home() {
  const courses = await getAllCourses();

  return (
    <div>
      <Heading className="mb-5">Khám Phá</Heading>

      <CourseGrid>
        {courses &&
          courses.length > 0 &&
          courses.map((item) => <CourseItem key={item.slug} data={item} />)}
      </CourseGrid>
    </div>
  );
}
