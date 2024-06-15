import React from "react";

import { CourseGrid, CourseItem, Heading } from "@/components/common";

export default async function Home() {
  return (
    <div>
      <Heading className="mb-5">Khám Phá</Heading>

      <CourseGrid>
        <CourseItem />
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </CourseGrid>
    </div>
  );
}
