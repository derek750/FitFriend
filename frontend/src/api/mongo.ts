import type { Workout } from "../types/workout";
import type { Task } from "../types/workout";

const API_URL = "http://localhost:5001/mongo";

export async function getAllWorkouts(): Promise<Workout[]> {
    const res = await fetch(`${API_URL}/getAllWorkouts`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Not authenticated or failed to fetch workouts");
    }

    return res.json();
}

export async function createWorkout(data: Workout): Promise<Workout> {
    const res = await fetch(`${API_URL}/createWorkout`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Failed to create workout");
    }

    return res.json();
}

export async function deleteWorkout(workoutId: string): Promise<void> {
    const res = await fetch(`${API_URL}/deleteWorkout/${workoutId}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to delete workout");
    }
}

export async function getWorkout(id: string) {
    const res = await fetch(`/workouts/${id}`)
    return res.json()
}

export async function updateWorkout(id: string, workout: any) {
    const res = await fetch(`/workouts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout),
    })

    return res.json()
}
