import { ECourseStatus } from "@/_types/enums";
import LessonContent from "@/components/common/Lesson/LessonContent";
import LessonItem from "@/components/common/Lesson/LessonItem";
import { DocumentIcon } from "@/components/icons";
import { NotFound } from "@/components/layout";
import {
  AccordionContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { courseLevelOptions } from "@/constants";
import { ILecture } from "@/databases/lecture.model";
import { getCourseBySlug } from "@/lib/actions/course.action";
import { getUser } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { PlayCircleIcon, User } from "lucide-react";
import Image from "next/image";
import ButtonEnroll from "./ButtonEnroll";
import AlreadyEnroll from "./AlreadyEnroll";
import CourseWidget from "./CourseWidget";

const page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const data = await getCourseBySlug({
    slug: params.slug,
  });
  if (!data || data.status !== ECourseStatus.APPROVED) return <NotFound />;
  const videoId = data.intro_url?.split("v=")[1];
  const lectures = data.lectures || [];
  const { userId } = auth();
  const findUser = await getUser(userId || "");
  const userCourses = findUser?.courses.map((c) => c.toString());

  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div>
        <div className="relative aspect-video mb-5">
          {data.intro_url ? (
            <iframe
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="BLACK MYTH WUKONG New Insane Combat Preview and Gameplay Demo | EXCLUSIVE PS5 and PC Launch"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="w-full h-full object-fill"
            ></iframe>
          ) : (
            <Image
              src={data.image}
              alt=""
              fill
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
        <h1 className="font-bold text-3xl mb-5">{data?.title}</h1>
        <BoxSection title="Mô tả">
          <div className="leading-normal bg-white p-4 rounded-md dark:bg-grayDarker">
            {data.desc}
          </div>
        </BoxSection>
        <BoxSection title="Nội dung bài học">
          <LessonContent
            lectures={lectures}
            courseSlug=""
            lessonSlug=""
          ></LessonContent>
        </BoxSection>
        <BoxSection title="Thông tin">
          <div className="grid grid-cols-4 gap-5 mb-10">
            <BoxInfo title="Bài học">100</BoxInfo>
            <BoxInfo title="Lượt xem">{data.views}</BoxInfo>
            <BoxInfo title="Trình độ">
              {
                courseLevelOptions.find((item) => item.value === data.level)
                  ?.label
              }
            </BoxInfo>
            <BoxInfo title="Thời lượng">100</BoxInfo>
          </div>
        </BoxSection>
        <BoxSection title="Yêu cầu">
          {data.info.requirements.map((r: string, index: number) => (
            <div key={index} className="mb-3 flex items-center gap-2">
              <span className="flex-shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </span>
              <span>{r}</span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title="Lợi ích">
          {data.info.benefits.map((r: string, index: number) => (
            <div key={index} className="mb-3 flex items-center gap-2">
              <span className="flex-shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </span>
              <span>{r}</span>
            </div>
          ))}
        </BoxSection>
        <BoxSection title="Q.A">
          {data.info.qa.map(
            (qa: { question: string; answer: string }, index: number) => (
              <Accordion type="single" collapsible key={index}>
                <AccordionItem value={qa.question}>
                  <AccordionTrigger>{qa.question}</AccordionTrigger>
                  <AccordionContent>{qa.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            )
          )}
        </BoxSection>
      </div>
      {userCourses?.includes(data._id.toString()) ? (
        <AlreadyEnroll></AlreadyEnroll>
      ) : (
        <CourseWidget
          findUser={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
          data={data ? JSON.parse(JSON.stringify(data)) : null}
        ></CourseWidget>
      )}
    </div>
  );
};

function BoxInfo({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-lg p-5 dark:bg-grayDarker">
      <h4 className="text-sm text-slate-400 font-normal">{title}</h4>
      <h3 className="font-bold">{children}</h3>
    </div>
  );
}

function BoxSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className="font-bold text-xl mb-5">{title}</h2>
      <div className="mb-10">{children}</div>
    </>
  );
}

export default page;
