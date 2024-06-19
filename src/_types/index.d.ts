import { ICourse } from "@/databases/corse.model";

type TMenuLink = {
  href: string;
  title: string;
  icon: React.ReactNode;
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
};
export { TMenuLink, TUserCreateData, TCreateCourseParams, TUpdateCourseParams };
