export type Workout = {
    task: Task[],
    date: Date
}

export type Task = {
    bodyPart: string, // gemini
    exercise: string, // gemini
    timeStarted: number, // ui
    timeTaken: number, // ui
    reps: number, // gemini
    sets: number, // gemini
    // test if cur response.declined = true;
    // cut the previous task --> in gemini
}
