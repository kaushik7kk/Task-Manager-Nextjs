import mongoose, { Schema, Document } from "mongoose";
import { Task, TaskSchema } from "./Task";

export interface User extends Document {
    fname: string;
    mname: string;
    lname: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    tasks: Task[];
}

const UserSchema: Schema<User> = new Schema({
    fname: {
        type: String,
        required: [true, "First name is required"],
        trim: true
    },
    mname: {
        type: String,
        required: false,
        trim: true
    },
    lname: {
        type: String,
        required: [true, "Last name is required"],
        trim: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    createdAt: {
        type: Date,
        required: [true, "Time of creation required"],
        default: Date.now()
    },
    tasks: [TaskSchema],
})

export const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);