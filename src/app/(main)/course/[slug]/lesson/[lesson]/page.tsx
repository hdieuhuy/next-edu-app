import { Heading } from "@/components/common";
import LessonContent from "@/components/common/Lesson/LessonContent";
import LessonItem from "@/components/common/Lesson/LessonItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/lib/actions/course.action";
import { getHistory } from "@/lib/actions/history.action";
import { findAllLessons, getLessonBySlug } from "@/lib/actions/lesson.action";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const LessonDetail = async ({
  params,
}: {
  params: {
    slug: string;
    lesson: string;
  };
}) => {
  const courseSlug = params.slug;
  const findCourse = await getCourseBySlug({ slug: courseSlug });
  const courseId = findCourse?._id.toString() || "";
  if (!findCourse) return null;
  const lessonDetails = await getLessonBySlug({
    slug: params.lesson,
    course: courseId,
  });
  const lessonList = (await findAllLessons({ course: courseId })) || [];
  const currentLessonIndex =
    lessonList.findIndex((item) => item.slug === params.lesson) || 0;
  const nextLesson = lessonList[currentLessonIndex + 1];
  const prevLesson = lessonList[currentLessonIndex - 1];
  if (!lessonDetails) return null;
  const videoId = lessonDetails.video_url?.split("v=").at(-1);
  const histories = (await getHistory({ course: courseId })) || [];
  const percentComplete = Math.floor(
    (histories.length / (lessonList.length || 1)) * 100
  );

  console.log({ percentComplete });

  return (
    <div className="grid xl:grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-10 min-h-screen items-start">
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
          ></iframe>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-3">
            <Button className="size-8 p-2" disabled={!prevLesson}>
              <Link href={`/course/${courseSlug}/lesson/${prevLesson?.slug}`}>
                <ArrowLeftIcon className="size-4" />
              </Link>
            </Button>

            <Button className="size-8 p-2" disabled={!nextLesson}>
              <Link href={`/course/${courseSlug}/lesson/${nextLesson?.slug}`}>
                <ArrowRightIcon className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div>
          <Heading className="mb-5">{lessonDetails.title}</Heading>
          <div className="p-5 rounded-lg bgDarkMode border borderDarkMode entry-content">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  lessonDetails.content || `Không có thông tin bài học này !`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-full rounded-full border borderDarkMode bgDarkMode">
            <div
              className={`h-full rounded-full bg-primary transition-all`}
              style={{
                width: `${percentComplete}%`,
              }}
            ></div>
          </div>
          <div className="text-sm font-bold">{percentComplete}%</div>
        </div>

        <LessonContent
          lectures={findCourse.lectures}
          courseSlug={courseSlug}
          lessonSlug={params.lesson}
          histories={histories ? JSON.parse(JSON.stringify(histories)) : []}
        ></LessonContent>
      </div>
    </div>
  );
};

export default LessonDetail;
