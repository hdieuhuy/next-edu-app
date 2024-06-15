import { TMenuLink } from "@/_types";
import {
  CommentIcon,
  CourseIcon,
  UserListIcon,
  DocumentIcon,
  EarthIcon,
} from "@/components/icons";

const menuItems: TMenuLink[] = [
  {
    href: "/",
    title: "Khám phá",
    icon: <EarthIcon />,
  },
  {
    href: "/study",
    title: "Khu vực học tập",
    icon: <DocumentIcon />,
  },
  {
    href: "/manage/user",
    title: "Quản lý thành viên",
    icon: <UserListIcon />,
  },
  {
    href: "/manage/course",
    title: "Quản lý khoá học",
    icon: <CourseIcon />,
  },
  {
    href: "/manage/comment",
    title: "Quản lý bình luận",
    icon: <CommentIcon />,
  },
];

export { menuItems };
