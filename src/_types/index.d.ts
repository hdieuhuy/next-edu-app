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
export { TMenuLink, TUserCreateData, TCreateCourseParams };
