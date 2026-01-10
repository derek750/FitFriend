import type { Workout } from "../types/workout";
import type { Task } from "../types/workout";

const API_URL = "http://localhost:3000/database";

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

export async function createWorkout(): Promise<Workout & { _id: string }> {
    const res = await fetch(`${API_URL}/createWorkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to create workout");
    }

    return res.json(); // TS now knows _id exists
}

export async function createTask(workoutId: string, task: Task): Promise<Workout> {
    const res = await fetch(`${API_URL}/workouts/${workoutId}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(task),
    });

    if (!res.ok) {
        throw new Error("Failed to create task");
    }

    return res.json();
}

export async function deleteTask(workoutId: string, taskIndex: number): Promise<Workout> {
    const res = await fetch(`${API_URL}/workouts/${workoutId}/tasks/${taskIndex}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to delete task");
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
    const res = await fetch(`${API_URL}/workouts/${id}`)
    return res.json()
}

export async function updateWorkout(id: string, workout: any) {
    const res = await fetch(`${API_URL}/workouts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout),
    })

    return res.json()
}
