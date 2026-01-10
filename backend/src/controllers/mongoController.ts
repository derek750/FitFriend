import { Response } from "express";
import Workout from '../models/workout';
import { AuthRequest } from '../middleware/auth';

export async function getUserWorkouts(req: AuthRequest, res: Response){
    try{
        const userId = req.user?._id 
        const workouts = await Workout.find({ userId: userId }).sort({ createdAt: -1 });
        res.json(workouts)
    }
    catch (error){
        res.status(500).json({ message: 'Error fetching workouts', error });
    }
}

export async function createWorkout(req: AuthRequest, res: Response){
    console.log(req.body)
    try{
        const workout = new Workout({
            
        });
        const savedTask = await workout.save();
        console.log("Created Task")
        res.status(201).json(savedTask);
    } 
    catch (error) {
        console.error('Create task error:', error); 
        res.status(400).json({ message: 'Error creating task', error });
    }
}