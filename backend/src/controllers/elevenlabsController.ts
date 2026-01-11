import { ElevenLabsClient } from "elevenlabs";
import { Response } from "express";
import { AuthRequest } from "../middleware/auth";

const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY!,
});

export async function speak(req: AuthRequest, res: Response) {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Text is required" });
        }

        const audioStream = await elevenlabs.textToSpeech.convert(
            "Rachel", // voiceId
            {
                text,
                model_id: "eleven_turbo_v2",
            }
        );
        res.setHeader("Content-Type", "audio/mpeg");
        audioStream.pipe(res);
    } catch (error) {
        console.error("ElevenLabs TTS error:", error);
        res.status(500).json({ error: "Failed to generate speech" });
    }
}