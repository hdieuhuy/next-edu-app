"use client";
import { TCourseLecture, TCreateLessonParams } from "@/_types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { commonClassNames } from "@/constants";
import { ILesson } from "@/databases/lesson.model";
import { createLecture, updateLecture } from "@/lib/actions/lecture.action";
import { createLesson, updateLesson } from "@/lib/actions/lesson.action";
import { CheckIcon, Edit2Icon, Trash2Icon, X } from "lucide-react";
import { MouseEvent, useState } from "react";
import { toast } from "react-toastify";
import slugify from "slugify";
import LessonItemUpdate from "../Lesson/LessonItemUpdate";
const CourseUpdateContent = ({ course }: { course: TCourseLecture }) => {
  const lectures = course.lectures;
  const [lectureEdit, setLectureEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");
  const [lessonEdit, setLessonEdit] = useState("");
  const [lessonIdEdit, setLessonIdEdit] = useState("");

  const handleAddNewLecture = async () => {
    try {
      const res = await createLecture({
        title: "Chương mới",
        course: course._id,
        order: lectures.length + 1,
        path: `manage/course/update-content?slug=${course.slug}`,
      });
      if (res?.success) {
        toast.success("Thêm chương mới thành công!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
      await updateLecture({
        lectureId,
        updateData: {
          _destroy: true,
          path: `manage/course/update-content?slug=${course.slug}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          path: `manage/course/update-content?slug=${course.slug}`,
          title: lectureEdit,
        },
      });
      if (res?.success) {
        toast.success("Cập nhật chương thành công");
        setLectureEdit("");
        setLectureIdEdit("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const res = await createLesson({
        lectureId,
        courseId,
        title: "Tiêu đề bài học mới",
        slug: `tieu-de-bai-hoc-${new Date().getTime().toString().slice(-4)}`,
        path: `manage/course/update-content?slug=${course.slug}`,
      });
      if (res?.success) {
        return toast.success("Tạo bài học mới thành công");
      }
      toast.error("Thêm bài học mới thất bại!");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteLesson = async () => {};
  const handleUpdateLesson = async (
    e: MouseEvent<HTMLSpanElement>,
    lessonId: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLesson({
        lessonId,
        path: `/manage/course/update-content?slug=${course.slug}`,
        updateData: {
          title: lessonEdit,
          slug: slugify(lessonEdit, {
            lower: true,
            locale: "vi",
            remove: /[*+~.()'"!:@]/g,
          }),
        },
      });
      if (res?.success) {
        toast.success("Cập nhật bài học thành công!");
        setLessonEdit("");
        setLessonIdEdit("");
      }
    } catch (error) {}
  };
  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture) => (
          <Accordion
            type="single"
            collapsible={lecture._id !== lectureIdEdit}
            className="w-full"
            key={lecture._id}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-3 justify-between w-full pr-5">
                  {lecture._id === lectureIdEdit ? (
                    <>
                      <div className="w-full">
                        <Input
                          placeholder="Tên chương"
                          defaultValue={lecture.title}
                          onChange={(e) => {
                            setLectureEdit(e.target.value);
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <span
                          className={commonClassNames.action}
                          onClick={(e) => handleUpdateLecture(e, lecture._id)}
                        >
                          <CheckIcon className="size-4" />
                        </span>
                        <span
                          className={commonClassNames.action}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLectureIdEdit("");
                          }}
                        >
                          <X className="size-4" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>{lecture.title}</div>
                      <div className="flex gap-2">
                        <span
                          className={commonClassNames.action}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLectureEdit(lecture.title);
                            setLectureIdEdit(lecture._id);
                          }}
                        >
                          <Edit2Icon className="size-4" />
                        </span>
                        <span
                          className={commonClassNames.action}
                          onClick={(e) => handleDeleteLecture(e, lecture._id)}
                        >
                          <Trash2Icon className="size-4" />
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="!border-transparent !bg-transparent">
                <div className="flex flex-col gap-8">
                  {lecture.lessons.map((lesson: ILesson) => (
                    <Accordion
                      type="single"
                      collapsible={lesson._id !== lessonIdEdit}
                      key={lesson._id}
                    >
                      <AccordionItem value={lesson._id}>
                        <AccordionTrigger>
                          <div className="flex items-center gap-3 justify-between w-full pr-5">
                            {lesson._id === lessonIdEdit ? (
                              <>
                                <div className="w-full">
                                  <Input
                                    placeholder="Tên bài học"
                                    defaultValue={lesson.title}
                                    onChange={(e) => {
                                      setLessonEdit(e.target.value);
                                    }}
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <span
                                    className={commonClassNames.action}
                                    onClick={(e) =>
                                      handleUpdateLesson(e, lesson._id)
                                    }
                                  >
                                    <CheckIcon className="size-4" />
                                  </span>
                                  <span
                                    className={commonClassNames.action}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setLessonIdEdit("");
                                    }}
                                  >
                                    <X className="size-4" />
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>{lesson.title}</div>
                                <div className="flex gap-2">
                                  <span
                                    className={commonClassNames.action}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setLessonEdit(lesson.title);
                                      setLessonIdEdit(lesson._id);
                                    }}
                                  >
                                    <Edit2Icon className="size-4" />
                                  </span>
                                  <span
                                    className={commonClassNames.action}
                                    onClick={
                                      (e) => {}
                                      // handleDeleteLesson(e, lesson._id)
                                    }
                                  >
                                    <Trash2Icon className="size-4" />
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <LessonItemUpdate lesson={lesson} course={course} />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ))}
                </div>

                <Button
                  onClick={() => handleAddNewLesson(lecture._id, course._id)}
                  className="mt-4 ml-auto flex"
                >
                  Thêm bài học mới
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      <Button onClick={handleAddNewLecture} className="mt-5">
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
