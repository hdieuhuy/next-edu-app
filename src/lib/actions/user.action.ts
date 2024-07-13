"use server";

import User, { IUser } from "@/databases/user.model";
import connectToDatabase from "../mongoose";
import { TUserCreateData } from "@/_types";
import Course, { ICourse } from "@/databases/corse.model";
import { auth } from "@clerk/nextjs/server";
import { ECourseStatus } from "@/_types/enums";

async function createUser(data: TUserCreateData): Promise<IUser | undefined> {
  try {
    connectToDatabase();
    const newUser = await User.create(data);
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

async function getUser(userId: string): Promise<IUser | null | undefined> {
  try {
    connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    if (!user) return null;
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getUserCourses(): Promise<ICourse[] | undefined | null> {
  try {
    connectToDatabase();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId }).populate({
      path: "courses",
      model: Course,
      match: {
        status: ECourseStatus.APPROVED,
      },
    });
    if (!findUser) return null;
    return findUser.courses;
  } catch (error) {
    console.log(error);
  }
}

export { createUser, getUser, getUserCourses };
