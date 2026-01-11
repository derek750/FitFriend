import type { AIResponse, WorkoutContext } from "../types/gemini";

const API_URL = "http://localhost:3000/gemini";

export async function interactAI(data: WorkoutContext): Promise<AIResponse> {
    const res = await fetch(`${API_URL}/newExercise`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Not authenticated or failed to fetch");
    }

    return res.json();
}

let data: WorkoutContext = {
    input: "",
    location: "",
    goal: [],
    completedExercises: [],
    declinedExercises: [],
};

export async function recommendExercise(input: string): Promise<AIResponse> {

    data.input = input;

    const res = await interactAI(data);

    // update data
    if(res.declined){
        data.declinedExercises.push(res.exercise);
    }
    else {
        data.completedExercises.push(res.exercise)
    }
    data.goal.push(res.muscle);
    if(data.location == "") data.location = res.location;

    return res;
}
