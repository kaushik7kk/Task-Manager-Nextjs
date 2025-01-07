import mongoose, { Schema, Document } from "mongoose";
import { Task, TaskSchema } from "./Task";

export interface UserData extends Document {
//   _id?: string;
  fname?: string;
  mname?: string;
  lname?: string;
  username?: string;
  email?: string;
  imgUrl?: string;
//   tasks?: Task[];
}

export interface User extends Document {
  fname: string;
  mname: string;
  lname: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  imgUrl: string;
  tasks: Task[];
}

const UserSchema: Schema<User> = new Schema({
  fname: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  mname: {
    type: String,
    required: false,
    trim: true,
  },
  lname: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  createdAt: {
    type: Date,
    required: [true, "Time of creation required"],
    default: Date.now(),
  },
  imgUrl: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
  },
  tasks: [TaskSchema],
});


export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
