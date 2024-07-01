"use client";
import { TCourseLecture } from "@/_types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { commonClassNames } from "@/constants";
import { ILecture } from "@/databases/lecture.model";
import { createLecture, updateLecture } from "@/lib/actions/lecture.action";
import { CheckIcon, Edit2Icon, Trash2Icon, X } from "lucide-react";
import { MouseEvent, useState } from "react";
import { toast } from "react-toastify";
const CourseUpdateContent = ({ course }: { course: TCourseLecture }) => {
  const lectures = course.lectures;
  const [lectureEdit, setLectureEdit] = useState("");
  const [lectureIdEdit, setLectureIdEdit] = useState("");

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
  return (
    <div>
      <div className="flex flex-col gap-5">
        {lectures.map((lecture: ILecture) => (
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
              <AccordionContent></AccordionContent>
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
