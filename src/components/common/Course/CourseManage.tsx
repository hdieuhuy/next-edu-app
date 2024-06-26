"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Image from "next/image";
import {
  BookMarked,
  DeleteIcon,
  Edit2Icon,
  EyeIcon,
  Trash2Icon,
} from "lucide-react";
import { ICourse } from "@/databases/corse.model";
import { courseStatusOptions } from "@/constants";
import Link from "next/link";
import { updateCourse } from "@/lib/actions/course.action";
import { toast } from "react-toastify";
import { ECourseStatus } from "@/_types/enums";
import Heading from "../Typography/Heading";
import { Input } from "@/components/ui/input";

function CourseManage({ courses }: { courses: ICourse[] }) {
  async function handleDeleteCourse(slug: string) {
    try {
      const res = await updateCourse({
        slug,
        updateData: {
          status: ECourseStatus.PENDING,
          _destroy: true,
        },
      });
      if (!res?.success) {
        toast.error(res?.message);
        return;
      }
      toast.success("Xoá thành công");
    } catch (error) {
      console.log(error);
    }
  }
  async function handleChangeStatus(slug: string, status: ECourseStatus) {
    if (status !== ECourseStatus.PENDING) {
      return toast.error("Khoá học đã được duyệt");
    }

    try {
      const res = await updateCourse({
        slug,
        updateData: {
          status:
            status === ECourseStatus.PENDING
              ? ECourseStatus.APPROVED
              : ECourseStatus.REJECTED,
        },
      });
      if (!res?.success) {
        toast.error(res?.message);
        return;
      }
      toast.success("Xoá thành công");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Heading className="mb-5">Quản lý khoá học</Heading>

        <div className="w-[300px]">
          <Input placeholder="Tìm kiếm khóa học..." />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá gốc</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="w-[200px] text-center">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses &&
            courses.length > 0 &&
            courses.map((item) => (
              <TableRow key={item.slug}>
                <TableCell>
                  <div className="flex gap-3">
                    <Image
                      alt=""
                      src={item.image}
                      className="size-20 object-cover rounded-md"
                      width={80}
                      height={80}
                    />

                    <div className="flex flex-col gap-2">
                      <div className="text-base font-bold">{item.title}</div>

                      <div className="text-sm text-slate-500 font-semibold">
                        {new Date(item.created_at).toLocaleDateString("vi-VI")}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{item.price.toLocaleString()}đ</TableCell>
                <TableCell
                  onClick={() => handleChangeStatus(item.slug, item.status)}
                  className="cursor-pointer"
                >
                  {courseStatusOptions.find((el) => el.value === item.status)
                    ?.label || ""}
                </TableCell>
                <TableCell className="w-[200px]">
                  <div className="flex gap-3">
                    <Link
                      href={`/manage/course/content/${item.slug}`}
                      className="flex justify-center items-center p-2 border border-slate-300 rounded-lg hover:bg-gray-200 transition-all"
                    >
                      <BookMarked className="size-4" />
                    </Link>

                    <Link
                      href={`/course/${item.slug}`}
                      className="flex justify-center items-center p-2 border border-slate-300 rounded-lg hover:bg-gray-200 transition-all"
                    >
                      <EyeIcon className="size-4" />
                    </Link>

                    <Link
                      href={`/manage/course/${item.slug}`}
                      className="flex justify-center items-center p-2 border border-slate-300 rounded-lg hover:bg-gray-200 transition-all"
                    >
                      <Edit2Icon className="size-4" />
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger>
                        <button className="flex justify-center items-center p-2 border border-slate-300 rounded-lg hover:bg-gray-200 transition-all">
                          <Trash2Icon className="size-4" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Bạn có chắc chắn xoá khoá học này?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Huỷ</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-500"
                            onClick={() => handleDeleteCourse(item.slug)}
                          >
                            Xoá!
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CourseManage;
