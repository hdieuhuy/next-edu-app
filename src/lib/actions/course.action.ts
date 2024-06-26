"use server";

import Course, { ICourse } from "@/databases/corse.model";
import connectToDatabase from "../mongoose";
import {
  TCourseLecture,
  TCreateCourseParams,
  TUpdateCourseParams,
} from "@/_types";
import { revalidatePath } from "next/cache";
import Lecture, { ILecture } from "@/databases/lecture.model";
import Lesson from "@/databases/lesson.model";

// fetching
export async function getAllCourses(): Promise<ICourse[] | undefined> {
  try {
    connectToDatabase();
    const courses = await Course.find();
    return courses;
  } catch (error) {
    console.log(error);
  }
}
export async function getCourseBySlug({
  slug,
}: {
  slug: string;
}): Promise<TCourseLecture | undefined> {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug }).populate({
      path: "lectures",
      model: Lecture,
      select: "_id title",
      match: {
        _destroy: false,
      },
      populate: {
        path: "lessons",
        model: Lesson,
        match: {
          _destroy: false,
        },
      },
    });
    return findCourse;
  } catch (error) {
    console.log(error);
  }
}
// CRUD
export async function createCourse(params: TCreateCourseParams) {
  try {
    connectToDatabase();
    const existCourse = await Course.findOne({ slug: params.slug });
    if (existCourse) {
      return {
        success: false,
        message: "Đường dẫn khóa học đã tồn tại!",
      };
    }
    const course = await Course.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error) {
    console.log(error);
  }
}
export async function updateCourse({
  slug,
  path,
  updateData,
}: TUpdateCourseParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findOne({ slug });
    if (!findCourse) return;
    await Course.findOneAndUpdate({ slug }, updateData, {
      new: true,
    });
    revalidatePath(path || "/");
    return {
      success: true,
      message: "Cập nhật khóa học thành công!",
    };
  } catch (error) {
    console.log(error);
  }
}
