export type Workout = {
    userId: string,
    tasks: Task[],
    date: Date
}

export type Task = {
    bodyPart: string, // gemini
    exercise: string, // gemini
    timeStarted: number, // ui
    timeTaken: number, // ui
    reps: number, // gemini
    sets: number, // gemini
    completed : boolean,
    // test if cur response.declined = true;
    // cut the previous task --> in gemini
}
