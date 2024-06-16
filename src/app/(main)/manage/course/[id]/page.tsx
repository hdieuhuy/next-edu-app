import { Heading } from "@/components/common";
import CourseAddNew from "@/components/common/Course/CourseAddNew";
import React from "react";

function AddEditCoursePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const isTypeCreate = id === "create";

  return (
    <div>
      <Heading>
        {isTypeCreate ? "Tạo khoá học mới" : "Cập nhật khoá học"}
      </Heading>

      <CourseAddNew />
    </div>
  );
}

export default AddEditCoursePage;
