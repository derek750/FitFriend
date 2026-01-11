import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { Readable } from "stream";

const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY!,
});

export async function speak(req: AuthRequest, res: Response) {
    const text: string = req.body.text;
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        const audioStream = await elevenlabs.textToDialogue.stream({
            inputs: [
                {
                    text,
                    voiceId: "1t1EeRixsJrKbiF1zwM6",
                },
            ],
        });

        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("Transfer-Encoding", "chunked");

        const nodeStream = Readable.fromWeb(audioStream);
        nodeStream.pipe(res);
    } catch (error) {
        console.error("ElevenLabs TTS Error:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Failed to generate audio" });
        }
    }
}
