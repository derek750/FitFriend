import express from "express";
import { ElevenLabsClient } from "elevenlabs";
import * as ElevenLabs from '../controllers/elevenlabsController';

const elevenLabsRouter = express.Router();

// POST /elevenlabs/speak
elevenLabsRouter.post("/speak", ElevenLabs.speak);

export default elevenLabsRouter;
