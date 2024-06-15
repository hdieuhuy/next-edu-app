type TMenuLink = {
  href: string;
  title: string;
  icon: React.ReactNode;
};
type TUserCreateData = {
  clerkId: string;
  email_address: string;
  name?: string;
  username?: string;
};

export { TMenuLink, TUserCreateData };
