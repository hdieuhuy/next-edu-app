"use server";

import { TCreateLessonParams, TUpdateLessonParams } from "@/_types";
import Course from "@/databases/corse.model";
import Lecture from "@/databases/lecture.model";
import Lesson, { ILesson } from "@/databases/lesson.model";
import connectToDatabase from "../mongoose";
import { revalidatePath } from "next/cache";

export async function createLesson(params: TCreateLessonParams) {
  try {
    connectToDatabase();
    const findCourse = await Course.findById(params.courseId);
    if (!findCourse) return;
    const findLecture = await Lecture.findById(params.lectureId);
    if (!findLecture) return;
    const newLesson = await Lesson.create({
      ...params,
      lecture: params.lectureId,
      course: params.courseId,
    });
    findLecture.lessons.push(newLesson._id);
    await findLecture.save();
    revalidatePath(params.path || "/");
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function updateLesson(params: TUpdateLessonParams) {
  try {
    connectToDatabase();
    const res = await Lesson.findByIdAndUpdate(
      params.lessonId,
      params.updateData,
      { new: true }
    );
    revalidatePath(params.path || "/");
    if (!res) return;
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function getLessonBySlug({
  slug,
  course,
}: {
  slug: string;
  course: string;
}): Promise<ILesson | undefined> {
  try {
    connectToDatabase();
    const findLesson = await Lesson.findOne({
      slug,
      course,
    });
    return findLesson;
  } catch (error) {
    console.log(error);
  }
}
export async function findAllLessons({
  course,
}: {
  course: string;
}): Promise<ILesson[] | undefined> {
  try {
    connectToDatabase();
    const findLesson = await Lesson.find({
      course,
    });
    return findLesson;
  } catch (error) {
    console.log(error);
  }
}
