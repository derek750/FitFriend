const API_URL = "http://localhost:3000/elevenlabs";

export async function speak(input: string): Promise<HTMLAudioElement> {
    const response = await fetch(`${API_URL}/speak`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text: input }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch audio");
    }
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    const audio = new Audio();
    audio.src = audioUrl;
    audio.preload = "auto";

    audio.muted = false;

    await new Promise<void>((resolve, reject) => {
        audio.oncanplaythrough = () => resolve();
        audio.onerror = () => reject(new Error("Audio failed to load"));
    });

    await audio.play();

    audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
    };

    return audio;
}
