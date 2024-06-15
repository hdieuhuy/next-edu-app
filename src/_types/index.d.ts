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

export { TMenuLink, TUserCreateData };
