export type Workout = {
    task: Task[],
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
