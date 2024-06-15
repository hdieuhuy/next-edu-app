import { EUserRole, EUserStatus } from "@/_types/enums";
import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email_address: string;
  avatar: string;
  createdAt: Date;
  status: EUserStatus;
  role: EUserRole;
  courses: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  clerkId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email_address: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  role: {
    type: String,
    enum: Object.values(EUserRole),
    default: EUserRole.USER,
  },
  status: {
    type: String,
    enum: EUserStatus,
    default: EUserStatus.UNACTIVE,
  },
});

const User = models.User || model("User", userSchema);

export default User;
