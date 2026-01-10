export type Workout = {
    task: Task[],
    // should be a date
    date: Date
}

export type Task = {
    bodyPart: string,
    exercise: string,
    timeStarted: number,
    timeTaken: number,
    reps: number,
    sets: number,
}
