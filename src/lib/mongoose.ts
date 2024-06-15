import mongoose from "mongoose";

let isConnected = false;

export default async function connectToDatabase() {
  if (!process.env.MONGODB_URL) {
    throw new Error("Database isn't exists");
  }
  if (isConnected) {
    throw new Error("Database is already connected");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, { dbName: "edu" });
    isConnected = true;
    console.log("Database is connected");
  } catch (error) {
    throw new Error("Errors while connecting");
  }
}
