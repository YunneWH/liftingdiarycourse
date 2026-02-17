"use server";

import { z } from "zod";
import { createWorkoutHelper } from "@/data/workouts";
import { auth } from "@clerk/nextjs/server";

const createWorkoutSchema = z.object({
  name: z.string().min(1, "Workout name is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
});

interface CreateWorkoutParams {
  name: string;
  date: string;
  time: string;
}

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[]> | string };

export async function createWorkout(
  params: CreateWorkoutParams
): Promise<ActionResult<{ id: string }>> {
  try {
    const result = createWorkoutSchema.safeParse(params);

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

    const workout = await createWorkoutHelper({
      name: result.data.name,
      startedAt,
      userId,
    });

    return {
      success: true,
      data: { id: workout.id },
    };
  } catch (error) {
    console.error("Failed to create workout:", error);
    return {
      success: false,
      errors: "Failed to create workout",
    };
  }
}
