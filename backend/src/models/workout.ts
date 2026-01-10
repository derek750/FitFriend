import mongoose, { Schema } from "mongoose";

export type Task = {
  bodyPart: string;
  exercise: string;
  timeStarted: number;
  timeTaken: number;
  reps: number;
  sets: number;
};

export interface Workout {
  task: Task[]; 
  date: Date;     
// need id
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
    task: {
      type: [TaskSchema], // ✅ array of tasks
      required: true,
    },
    date: {
      type: Date,
      default: Date.now, // ✅ auto timestamp
    },
  },
  // need an id
);

export default mongoose.model<Workout>("Workout", WorkoutSchema);
