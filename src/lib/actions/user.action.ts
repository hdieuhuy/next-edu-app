"use server";

import User, { IUser } from "@/databases/user.model";
import connectToDatabase from "../mongoose";
import { TUserCreateData } from "@/_types";

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

export { createUser, getUser };
