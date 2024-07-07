import React from "react";
import LessonContent from "@/components/common/Lesson/LessonContent";
import { getCourseBySlug } from "@/lib/actions/course.action";
import PageNotFound from "@/app/not-found";
import { getHistory } from "@/lib/actions/history.action";
import { countLessonByCourse } from "@/lib/actions/lesson.action";

async function LessonOutline({
  params,
}: {
  params: {
    slug: string;
    lesson: string;
  };
}) {
  const courseSlug = params.slug;
  const findCourse = await getCourseBySlug({ slug: courseSlug });
  const courseId = findCourse?._id.toString() || "";
  if (!findCourse) return <PageNotFound />;
  const countLesson = await countLessonByCourse({ courseId });
  const histories = (await getHistory({ course: courseId })) || [];
  const percentComplete = Math.floor(
    (histories.length / (countLesson || 1)) * 100
  );

  return (
    <div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-3 w-full rounded-full border borderDarkMode bgDarkMode">
          <div
            className={`h-full rounded-full bg-gradient-to-r from-primary to-secondary w-0 transition-all duration-300`}
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
  );
}

export default LessonOutline;
