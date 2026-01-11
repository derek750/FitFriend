export interface AIResponse {
    exercise: string;
    location: string;
    muscle: string;
    reps: number;
    sets: number;
    declined: boolean;
    response: string;
    isNotTask: boolean;
}

export interface WorkoutContext {
    input : string;
    location: string;
    goal: string[];
    completedExercises: string[];
    declinedExercises: string[];
}
