import mongoose, { Schema, Document } from "mongoose";

interface TimeLeft {
    hours: number;
    minutes: number;
    seconds: number;
}

export interface Task extends Document {
  title: string;
  finished: boolean;
  time: TimeLeft;
  inGroup: boolean;
}

export const TaskSchema: Schema<Task> = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    finished: {
        type: Boolean,
        required:[true, "Finished status required"],
        default: false,
    },
    time: {
        type: Object,
        required: [true, "Time left is required"],
        default: {
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    },
    inGroup: {
        type: Boolean,
        required: [true, "Task in-group status required"],
        default: false,
    }
})

export const TaskModel = (mongoose.models.Task as mongoose.Model<Task>) || mongoose.model<Task>("Task", TaskSchema);
