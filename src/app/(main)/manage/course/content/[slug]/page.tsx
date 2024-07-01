import { Heading } from "@/components/common";
import CourseUpdateContent from "@/components/common/Course/CourseUpdateContent";
import { NotFound } from "@/components/layout";
import { getCourseBySlug } from "@/lib/actions/course.action";

const page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const course = await getCourseBySlug({ slug: params.slug });

  if (!course) return <NotFound />;

  return (
    <div>
      <Heading className="mb-4">
        Nội dung:
        <span className="text-primary"> {course.title}</span>
      </Heading>

      <CourseUpdateContent course={JSON.parse(JSON.stringify(course))} />
    </div>
  );
};

export default page;
