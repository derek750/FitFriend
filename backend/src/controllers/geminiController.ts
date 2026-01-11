import { Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { AuthRequest } from '../middleware/auth';

import { zodToJsonSchema } from "zod-to-json-schema";

import { WorkoutContext, exerciseSchema } from '../models/gemini';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

export async function newExercise(req: AuthRequest, res: Response) {

    const context: WorkoutContext = req.body.context;

    const prompt: string = `You are Cleb a personal fitness coach. You will be asked by the user
    to recommend exercises based on their muscle target. Do not recommend ${context.completedExercises} as they have already
    been recommended and completed. Do not recommend ${context.declinedExercises} as they have been declined by the user.
    When recommending keep in mind their location which is ${context.location}. The user says ${context.input}`;

    try {
        const response: any = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: zodToJsonSchema(exerciseSchema),
            },
        });

        const task = exerciseSchema.parse(JSON.parse(response.text));
        console.log(task);
        res.status(201).json(task);
    } catch (error) {
        console.error("Generating new exercise error:", error);
        res.status(400).json({ message: "Error creating exercise", error });
    }
}