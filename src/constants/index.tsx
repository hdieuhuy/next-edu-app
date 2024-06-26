import { TMenuLink } from "@/_types";
import { ECourseLevel, ECourseStatus } from "@/_types/enums";
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
const courseStatusOptions: {
  label: string;
  value: ECourseStatus;
}[] = [
  {
    label: "Chờ duyệt",
    value: ECourseStatus.PENDING,
  },
  {
    label: "Đã duyệt",
    value: ECourseStatus.APPROVED,
  },
  {
    label: "Từ chối",
    value: ECourseStatus.REJECTED,
  },
];
const courseLevelOptions: {
  label: string;
  value: ECourseLevel;
  textStyle?: string;
  bgStyle?: string;
}[] = [
  {
    label: "Dễ",
    value: ECourseLevel.BEGINNER,
    textStyle: "text-green-500 font-semibold",
    bgStyle: "bg-green-200 rounded-md",
  },
  {
    label: "Trung bình",
    value: ECourseLevel.INTERMEDIATE,
    textStyle: "text-orange-500 font-semibold",
    bgStyle: "bg-orange-200 rounded-md",
  },
  {
    label: "Khó",
    value: ECourseLevel.ADVANCED,
    textStyle: "text-red-500 font-semibold",
    bgStyle: "bg-red-200 rounded-md",
  },
];
export { menuItems, courseStatusOptions, courseLevelOptions };
