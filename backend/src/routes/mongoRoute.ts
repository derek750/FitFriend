import express from "express"
import * as Mongo from "../controllers/mongoController"
import { isAuthenticated } from '../middleware/auth';

const mongoRouter = express.Router();

mongoRouter.use(isAuthenticated)

// get all of tasks for user
// id --> user id
mongoRouter.get("/getAllWorkouts", Mongo.getUserWorkouts);

// creates new database input
//
mongoRouter.post("/createWorkout", Mongo.createWorkout);

export default mongoRouter;

