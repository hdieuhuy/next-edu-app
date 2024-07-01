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

const commonClassNames = {
  action:
    "flex justify-center items-center p-2 border border-slate-300 rounded-lg hover:bg-gray-200 transition-all",
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

export {
  menuItems,
  courseStatusOptions,
  courseLevelOptions,
  commonClassNames,
  editorOptions,
};
