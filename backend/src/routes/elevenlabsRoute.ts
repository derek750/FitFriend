import express from "express";
import * as ElevenLabs from '../controllers/elevenlabsController';

const elevenLabsRouter = express.Router();

// POST /elevenlabs/speak
elevenLabsRouter.post("/speak", ElevenLabs.speak);

export default elevenLabsRouter;
