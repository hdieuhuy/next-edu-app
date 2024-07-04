"use server";

import User from "@/databases/user.model";
import { TCreateHistoryParams } from "@/_types";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "../mongoose";
import History, { IHistory } from "@/databases/history.model";
import { revalidatePath } from "next/cache";

export async function createHistory(params: TCreateHistoryParams) {
  try {
    connectToDatabase();
    const { userId } = auth();
    const findUser = await User.findOne({ clerkId: userId });
    if (!findUser) return;
    if (params.checked) {
      await History.create({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    } else {
      await History.findOneAndDelete({
        course: params.course,
        lesson: params.lesson,
        user: findUser._id,
      });
    }
    revalidatePath(params.slug || "/");
  } catch (error) {
    console.log(error);
  }
}
export async function getHistory(params: {
  course: string;
}): Promise<IHistory[] | undefined> {
  try {
    connectToDatabase();
    const histories = await History.find({
      course: params.course,
    });
    return histories;
  } catch (error) {}
}
