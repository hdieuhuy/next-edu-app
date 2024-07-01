import { ICourse } from "@/databases/corse.model";

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
type TCreateCourseParams = {
  title: string;
  slug: string;
};
type TUpdateCourseParams = {
  slug: string;
  updateData: Partial<ICourse>;
  path?: string;
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
type TCourseLecture = Omit<ICourse, "lectures"> & {
  lectures: ILecture[];
};
export {
  TMenuLink,
  TUserCreateData,
  TCourseLecture,
  TCreateCourseParams,
  TUpdateCourseParams,
  TCreateLectureParams,
  TUpdateLectureParams,
};
