import { ElevenLabsClient } from "elevenlabs";
import { Response } from "express";

const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY!,
});

export async function speak(req : , res : Response) {
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
}

/*
const response = await fetch("http://localhost:3000/elevenlabs/speak", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include",
  body: JSON.stringify({
    text: "Keep your core tight and breathe steadily.",
  }),
});

const audioBlob = await response.blob();
const audioUrl = URL.createObjectURL(audioBlob);
new Audio(audioUrl).play();
*/