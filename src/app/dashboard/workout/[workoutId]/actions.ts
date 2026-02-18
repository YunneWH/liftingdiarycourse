"use server";

import { z } from "zod";
import { updateWorkoutHelper } from "@/data/workouts";
import { auth } from "@clerk/nextjs/server";

const updateWorkoutSchema = z.object({
  workoutId: z.string().uuid("Invalid workout ID"),
  name: z.string().min(1, "Workout name is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
});

interface UpdateWorkoutParams {
  workoutId: string;
  name: string;
  date: string;
  time: string;
}

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[]> | string };

export async function updateWorkout(
  params: UpdateWorkoutParams
): Promise<ActionResult<{ id: string }>> {
  try {
    const result = updateWorkoutSchema.safeParse(params);

    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors,
      };
    }

    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        errors: "Authentication required",
      };
    }

    const startedAt = new Date(`${result.data.date}T${result.data.time}`);

    const workout = await updateWorkoutHelper({
      id: result.data.workoutId,
      name: result.data.name,
      startedAt,
      userId,
    });

    if (!workout) {
      return {
        success: false,
        errors: "Workout not found",
      };
    }

    return {
      success: true,
      data: { id: workout.id },
    };
  } catch (error) {
    console.error("Failed to update workout:", error);
    return {
      success: false,
      errors: "Failed to update workout",
    };
  }
}
