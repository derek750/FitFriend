import { z } from "zod";

export const exerciseSchema : any = z.object({
    exercise: z.string().describe("Name of the excercise"),
    location: z.string().describe("location of user"),
    muscle: z.string().describe("Muscle group we are targeting to workout through this excercise"),
    reps: z.number().describe("Number of reps suggested for the exercise"),
    sets: z.number().describe("Number of sets suggested for the excercise"),
    declined: z.boolean().describe("If the user declines previous exercise set as true"),
    response: z.string().describe("Response to the user"),
    isNotTask: z.boolean().describe("If the AI is not giving an exercise response this is true")
});

export interface AIResponse {
    exercise: string;
    location: string;
    muscle: string;
    reps: number;
    sets: number;
    declined: boolean;
    response: string;
    isNotTask: boolean
}

export interface WorkoutContext {
    input : string;
    location: string;
    goal: string[];
    completedExercises: string[];
    declinedExercises: string[];
}
