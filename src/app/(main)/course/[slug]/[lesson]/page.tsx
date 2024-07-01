import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/lib/actions/course.action";
import { getLessonBySlug } from "@/lib/actions/lesson.action";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const LessonDetail = async ({
  params,
}: {
  params: {
    slug: string;
    lesson: string;
  };
}) => {
  const course = params.slug;
  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;
  const lessonDetails = await getLessonBySlug({
    slug: params.lesson,
    course: findCourse?._id.toString() || "",
  });
  if (!lessonDetails) return null;
  const videoId = lessonDetails.video_url?.split("v=").at(-1);
  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
          ></iframe>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Button className="size-10 p-3">
              <ArrowLeftIcon />
            </Button>
            <Button className="size-10 p-3">
              <ArrowRightIcon />
            </Button>
          </div>
          <div></div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default LessonDetail;
