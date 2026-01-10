import { Response } from "express";
import Workout from '../models/workout';
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

export async function createWorkout(req: AuthRequest, res: Response) {
    try {
        const workout = new Workout({
            task: {
                bodyPart: req.body.bodyPart,
                exercise: req.body.exercise,
                timeStarted: req.body.timeStarted,
                timeTaken: req.body.timeTaken,
                reps: req.body.reps,
                sets: req.body.sets,
            },
            date: req.body.date,
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