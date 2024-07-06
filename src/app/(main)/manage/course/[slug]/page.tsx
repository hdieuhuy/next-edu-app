import { Heading } from "@/components/common";
import CourseAddEditForm from "@/components/common/Course/CourseAddEditForm";
import { getCourseBySlug } from "@/lib/actions/course.action";
import React from "react";

async function AddEditCoursePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const isTypeCreate = slug === "create";

  const coures = await getCourseBySlug({ slug });

  if (!coures && !isTypeCreate) return;

  return (
    <div>
      <Heading>
        {isTypeCreate ? "Tạo khoá học mới" : "Cập nhật khoá học"}
      </Heading>

      <CourseAddEditForm
        data={JSON.parse(JSON.stringify(coures))}
        params={slug}
      />
    </div>
  );
}

export default AddEditCoursePage;
