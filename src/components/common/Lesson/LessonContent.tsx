import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LessonItem from "./LessonItem";

import { TUpdateCourseLecture } from "@/_types";
import { IHistory } from "@/databases/history.model";
import { getLectureByLesson } from "@/lib/actions/lesson.action";

const LessonContent = async ({
  lectures,
  courseSlug,
  lessonSlug,
  histories = [],
}: {
  lectures: TUpdateCourseLecture[];
  courseSlug: string;
  lessonSlug: string;
  histories?: IHistory[];
}) => {
  const currentLesson = await getLectureByLesson({
    lessonSlug,
  });

  if (!currentLesson) return null;

  return (
    <div className="flex flex-col gap-5">
      {lectures.map((lecture: TUpdateCourseLecture) => (
        <Accordion
          type="single"
          collapsible
          className="w-full"
          key={lecture._id}
          defaultValue={currentLesson.lecture}
        >
          <AccordionItem value={lecture._id.toString()}>
            <AccordionTrigger>
              <div className="flex items-center gap-3 justify-between w-full pr-5">
                <div className="line-clamp-1">{lecture.title}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="!bg-transparent border-none p-0">
              <div className="flex flex-col gap-3 mt-5">
                {lecture.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson._id}
                    lesson={lesson ? JSON.parse(JSON.stringify(lesson)) : []}
                    url={
                      !courseSlug
                        ? ""
                        : `/course/${courseSlug}/lesson/${lesson.slug}`
                    }
                    isActive={!lessonSlug ? false : lesson.slug === lessonSlug}
                    isChecked={histories.some(
                      (el) => el.lesson.toString() === lesson._id.toString()
                    )}
                  ></LessonItem>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default LessonContent;
