import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LessonItem from "./LessonItem";
import { TUpdateCourseLecture } from "@/_types";

const LessonContent = ({
  lectures,
  courseSlug,
  lessonSlug,
}: {
  lectures: TUpdateCourseLecture[];
  courseSlug: string;
  lessonSlug: string;
}) => {
  return (
    <div className="flex flex-col gap-5">
      {lectures.map((lecture: TUpdateCourseLecture) => (
        <Accordion
          type="single"
          collapsible
          className="w-full"
          key={lecture._id}
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
                    lesson={lesson}
                    url={
                      !courseSlug
                        ? ""
                        : `/course/${courseSlug}/lesson/${lesson.slug}`
                    }
                    isActive={!lessonSlug ? false : lesson.slug === lessonSlug}
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