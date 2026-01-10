import express from "express";
import * as Mongo from "../controllers/mongoController";
import { isAuthenticated } from "../middleware/auth";

const mongoRouter = express.Router();

mongoRouter.use(isAuthenticated);

mongoRouter.get("/getAllWorkouts", Mongo.getUserWorkouts);
mongoRouter.post("/createWorkout", Mongo.createWorkout);
mongoRouter.put("/workouts/:id", Mongo.updateWorkout);
mongoRouter.delete("/deleteWorkout/:id", Mongo.deleteWorkout);

mongoRouter.post("/workouts/:workoutId/tasks", Mongo.createTask);
mongoRouter.delete("/workouts/:workoutId/tasks/:taskIndex", Mongo.deleteTask);

export default mongoRouter;