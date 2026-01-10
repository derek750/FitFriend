export async function speak(input : string): Promise<HTMLAudioElement> {
    const response = await fetch("http://localhost:3000/elevenlabs/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            text: input,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch audio");
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    const audio = new Audio(audioUrl);
    await audio.play();

    return audio;
}
