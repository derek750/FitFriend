import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';

import { AI } from '../server'

import { zodToJsonSchema } from "zod-to-json-schema";

import { AIResponse, WorkoutContext, exerciseSchema } from '../models/gemini';

export async function newExercise(req: AuthRequest, res: Response) {

    const context: WorkoutContext = req.body;

    const prompt: string = `You are Cleb a personal fitness coach. You will be asked by the user
    to recommend exercises based on their muscle target. Do not recommend ${context.completedExercises} as they have already
    been recommended and completed. Do not recommend ${context.declinedExercises} as they have been declined by the user.
    When recommending keep in mind their location which is ${context.location}. The user says ${context.input}`;
    
    try {
        const response: any = await AI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "model",
                    parts: [{
                        text: `You must output exactly one JSON object matching the schema. Arrays are forbidden.
                        exercise: string;
                        location: string;
                        muscle: string;
                        reps: number;
                        sets: number;
                        declined: boolean;
                        response: string;
                        isNotTask: boolean
                        Each must get a response and must match the datatype`
                    }]
                },
                {
                    role: "user",
                    parts: [{ text: prompt }]
                }
            ],
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: zodToJsonSchema(exerciseSchema),
            },
        });
        console.log(response.text)
        const task: AIResponse = exerciseSchema.parse(JSON.parse(response.text));
        res.status(201).json(task);
    } catch (error) {
        console.error("Generating new exercise error:", error);
        res.status(400).json({ message: "Error creating exercise", error });
    }
}