import { Response } from "express";
import Workout from '../models/workout';
import { Task } from "../models/workout";
import { AuthRequest } from '../middleware/auth';

export async function getUserWorkouts(req: AuthRequest, res: Response) {
    try {
        const userId = req.user?._id
        const workouts = await Workout.find({ userId: userId }).sort({ createdAt: -1 });
        res.json(workouts)
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching workouts', error });
    }
}

export async function createTask(req: AuthRequest, res: Response) {
    try {
        const { workoutId } = req.params;

        const newTask = {
            bodyPart: req.body.bodyPart,
            exercise: req.body.exercise,
            timeStarted: req.body.timeStarted,
            timeTaken: req.body.timeTaken,
            reps: req.body.reps,
            sets: req.body.sets,
        };

        const updatedWorkout = await Workout.findByIdAndUpdate(
            workoutId,
            { $push: { tasks: newTask } },
            { new: true }
        );

        if (!updatedWorkout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.status(201).json(updatedWorkout);
    } catch (error) {
        console.error("Create task error:", error);
        res.status(400).json({ message: "Error creating task", error });
    }
}

export async function deleteTask(req: AuthRequest, res: Response) {
  try {
    let { workoutId, taskIndex } = req.params;

    // Ensure string type
    if (Array.isArray(workoutId) || Array.isArray(taskIndex)) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const index = parseInt(taskIndex, 10);
    if (isNaN(index)) {
      return res.status(400).json({ message: "Invalid task index" });
    }

    const workout = await Workout.findById(workoutId);
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    if (index < 0 || index >= workout.task.length) {
      return res.status(400).json({ message: "Task index out of range" });
    }

    workout.task.splice(index, 1);
    const updatedWorkout = await workout.save();

    res.status(200).json(updatedWorkout);
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(400).json({ message: "Error deleting task", error });
  }
}

export async function createWorkout(req: AuthRequest, res: Response) {
  try {
    const workout = new Workout({
      tasks: [],            
      date: new Date(),
    });

    const savedWorkout = await workout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    console.error("Create workout error:", error);
    res.status(400).json({ message: "Error creating workout", error });
  }
}

export async function deleteWorkout(req: AuthRequest, res: Response) {
    try {
        const { id } = req.params;
        const userId = req.user!._id;

        const deletedWorkout = await Workout.findOneAndDelete({
            _id: id,
            userId: userId,
        });

        if (!deletedWorkout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.status(200).json({ message: "Workout deleted", id });
    } catch (error) {
        console.error("Delete workout error:", error);
        res.status(400).json({ message: "Error deleting workout", error });
    }
}

export async function updateWorkout(req: AuthRequest, res: Response) {
    try {
        const { id } = req.params;
        const userId = req.user!._id;

        const updatedWorkout = await Workout.findOneAndUpdate(
            {
                _id: id,
                userId: userId,
            },
            req.body,
            {
                new: true,       // return updated document
                runValidators: true,
            }
        );

        if (!updatedWorkout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.status(200).json({
            message: "Workout updated",
            workout: updatedWorkout,
        });
    } catch (error) {
        console.error("Update workout error:", error);
        res.status(400).json({
            message: "Error updating workout",
            error,
        });
    }
}