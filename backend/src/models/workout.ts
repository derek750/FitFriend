import mongoose, { Schema, Types } from "mongoose";

export type Workout = {
    userId: string,
    tasks: Task[],
    date: Date,
}

export type Task = {
    bodyPart: string,
    exercise: string,
    timeStarted: number,
    timeTaken: number,
    reps: number,
    sets: number,
}


const TaskSchema = new Schema<Task>(
  {
    bodyPart: { type: String, required: true },
    exercise: { type: String, required: true },
    timeStarted: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    reps: { type: Number, required: true },
    sets: { type: Number, required: true },
  },
  { _id: false } // optional: prevents auto _id for each task
);

const WorkoutSchema = new Schema<Workout>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    tasks: {
      type: [TaskSchema], 
      required: true,
    },
    date: {
      type: Date,
      default: Date.now, 
    },
  },

);

export default mongoose.model<Workout>("Workout", WorkoutSchema);
