import mongoose, { Schema } from 'mongoose';

export interface IWorkout {
    task: Task,
    time: number
}

export type Task = {
    bodyPart: string,
    exercise: string,
    timeStarted: number,
    timeTaken: number,
    reps: number,
    sets: number,
}

const TaskSchema = new Schema<Task>({
    bodyPart: { type: String, required: true },
    exercise: { type: String, required: true },
    timeStarted: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    reps: { type: Number, required: true },
    sets: { type: Number, required: true },
});

const WorkoutSchema = new Schema<IWorkout>({
    task: { type: TaskSchema, required: true },
    time: { type: Number, required: true },
});

// Index for efficient querying by userId
TaskSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);