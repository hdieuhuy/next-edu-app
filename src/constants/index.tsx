import DocumentIcon from "@/components/icons/DocumentIcon";
import EarthIcon from "@/components/icons/EarthIcon";

const menuItems: {
  href: string;
  title: string;
  icon: React.ReactNode;
}[] = [
  {
    href: "/",
    title: "Khu vực học tập",
    icon: <DocumentIcon />,
  },
  {
    href: "/explore",
    title: "Khám phá",
    icon: <EarthIcon />,
  },
];

export { menuItems };
