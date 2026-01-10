import express from "express";
import { ElevenLabsClient } from "elevenlabs";

const elevenLabsRouter = express.Router();

const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY!,
});

// POST /elevenlabs/speak
elevenLabsRouter.post("/speak", async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        const audioStream = await elevenlabs.textToSpeech.convert({
            voice_id: "Rachel", // or your preferred voice ID
            model_id: "eleven_turbo_v2",
            text,
        });

        res.setHeader("Content-Type", "audio/mpeg");
        audioStream.pipe(res);
    } catch (error) {
        console.error("ElevenLabs TTS error:", error);
        res.status(500).json({ error: "Failed to generate speech" });
    }
});

export default elevenLabsRouter;
