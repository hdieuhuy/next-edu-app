import { ICourse } from "@/databases/corse.model";
import { ILesson } from "@/databases/lesson.model";

type TMenuLink = {
  href: string;
  title: string;
  icon: React.ReactNode;
  onlyIcon?: boolean;
};
type TUserCreateData = {
  clerkId: string;
  email: string;
  name: string;
  username?: string;
  avatar?: string;
};
// Course
type TCreateCourseParams = {
  title: string;
  slug: string;
};
type TUpdateCourseParams = {
  slug: string;
  updateData: Partial<ICourse>;
  path?: string;
};
type TGetAllCourseParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};
// Lecture
type TCreateLectureParams = {
  course: string;
  title?: string;
  order?: number;
  path?: string;
};
type TUpdateLectureParams = {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    _destroy?: boolean;
    path?: string;
  };
};
type TUpdateCourseLecture = {
  _id: string;
  title: string;
  lessons: ILesson[];
};
type TCourseLecture = Omit<ICourse, "lectures"> & {
  lectures: {
    _id: string;
    title: string;
    lessons: ILesson[];
  }[];
};
type TCreateLessonParams = {
  lectureId: string;
  courseId: string;
  title?: string;
  order?: number;
  slug?: string;
  path?: string;
};
type TUpdateLessonParams = {
  lessonId: string;
  updateData: {
    title?: string;
    slug?: string;
    duration?: number;
    video_url?: string;
    content?: string;
  };
  path?: string;
};
// History
type TCreateHistoryParams = {
  course: string;
  lesson: string;
  checked: boolean | string;
  slug?: string;
};
// LocalStorage
type TLessonUserStuyding = {
  course: string;
  lesson: string;
};
export {
  TMenuLink,
  TUserCreateData,
  TCourseLecture,
  TCreateCourseParams,
  TUpdateCourseParams,
  TCreateLectureParams,
  TUpdateLectureParams,
  TCreateLessonParams,
  TUpdateLessonParams,
  TUpdateCourseLecture,
  TCreateHistoryParams,
  TGetAllCourseParams,
  TLessonUserStuyding,
};
