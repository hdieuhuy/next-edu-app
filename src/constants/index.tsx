import { TMenuLink } from "@/_types";
import {
  ECouponType,
  ECourseLevel,
  ECourseStatus,
  EOrderStatus,
} from "@/_types/enums";
import {
  CommentIcon,
  CourseIcon,
  UserListIcon,
  DocumentIcon,
  EarthIcon,
} from "@/components/icons";
import { DatabaseZapIcon, TagIcon } from "lucide-react";

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
    href: "/manage/coupon",
    title: "Quản lý coupon",
    icon: <TagIcon />,
  },
  {
    href: "/manage/course",
    title: "Quản lý khoá học",
    icon: <CourseIcon />,
  },
  {
    href: "/manage/order",
    title: "Quản lý đơn hàng",
    icon: <DatabaseZapIcon />,
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

const commonClassNames = {
  status:
    "bg-opacity-10 border border-current rounded-md font-medium px-3 py-1 text-xs whitespace-nowrap",
  action:
    "size-8 rounded-md border flex items-center justify-center p-2  text-gray-500 hover:border-opacity-80 dark:bg-transparent borderDarkMode dark:hover:border-opacity-20",
  paginationButton:
    "size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center hover:border-primary transition-all hover:text-primary p-2.5",
  btnPrimary:
    "flex items-center justify-center w-full mt-10 rounded-lg text-white font-bold bg-primary h-12 button-primary",
};

const editorOptions = (field: any, theme: any) => ({
  initialValue: "",
  onBlur: field.onBlur,
  onEditorChange: (content: any) => field.onChange(content),
  init: {
    codesample_global_prismjs: true,
    skin: theme === "dark" ? "oxide-dark" : "oxide",
    height: 300,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "preview",
      "anchor",
      "searchreplace",
      "visualblocks",
      "codesample",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "heading",
    ],
    toolbar:
      "undo redo | " +
      "codesample | bold italic forecolor | alignleft aligncenter |" +
      "alignright alignjustify | bullist numlist |" +
      "image |" +
      "h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
      "link",
    content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };`,
  },
});

const orderStatus: {
  title: string;
  value: EOrderStatus;
  className?: string;
}[] = [
  {
    title: "Đã duyệt",
    value: EOrderStatus.COMPLETED,
    className: "text-green-500 bg-green-500",
  },
  {
    title: "Chờ duyệt",
    value: EOrderStatus.PENDING,
    className: "text-orange-500 bg-orange-500",
  },
  {
    title: "Đã huỷ",
    value: EOrderStatus.CANCELED,
    className: "text-red-500 bg-red-500",
  },
];

export const couponTypes: {
  title: string;
  value: ECouponType;
}[] = [
  {
    title: "Phần trăm",
    value: ECouponType.PERCENT,
  },
  {
    title: "Giá trị",
    value: ECouponType.AMOUNT,
  },
];

export {
  menuItems,
  courseStatusOptions,
  courseLevelOptions,
  commonClassNames,
  editorOptions,
  orderStatus,
};
