import React from "react";
import LessonSaveUrl from "../LessonSaveUrl";
import { getCourseBySlug } from "@/lib/actions/course.action";
import { findAllLessons, getLessonBySlug } from "@/lib/actions/lesson.action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Heading } from "@/components/common";

async function LessonPlayer({
  params,
}: {
  params: {
    slug: string;
    lesson: string;
  };
}) {
  const courseSlug = params.slug;
  const lessonSlug = params.lesson;

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

  return (
    <div>
      <LessonSaveUrl
        course={courseSlug}
        url={`/course/${courseSlug}/lesson/${lessonSlug}`}
      ></LessonSaveUrl>
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            className="w-full h-full object-fill"
            src={`https://www.youtube.com/embed/${videoId}`}
          ></iframe>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex gap-3 justify-between w-full">
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
    </div>
  );
}

export default LessonPlayer;
