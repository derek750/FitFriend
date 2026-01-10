import express from "express"
import * as Mongo from "../controllers/mongoController"
import { isAuthenticated } from '../middleware/auth';

const mongoRouter = express.Router();

mongoRouter.use(isAuthenticated)

// get all of tasks for user
// id --> user id
// returns --> all of users workouts as array
mongoRouter.get("/getAllWorkouts", Mongo.getUserWorkouts);

// creates new database input
// id --> user id
/*
bodyPart: string[],
exercise: string[],
timeStarted: number[],
timeTaken: number[],
reps: number[],
sets: number[],
*/
mongoRouter.post("/createWorkout", Mongo.createWorkout);

export default mongoRouter;

