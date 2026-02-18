import { db } from "@/db";
import { workouts } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function createWorkoutHelper(data: {
  name: string;
  startedAt: Date;
  userId: string;
}) {
  const [workout] = await db
    .insert(workouts)
    .values({
      name: data.name,
      startedAt: data.startedAt,
      userId: data.userId,
    })
    .returning();

  return workout;
}

export async function getWorkoutById(workoutId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const [workout] = await db
    .select()
    .from(workouts)
    .where(and(eq(workouts.id, workoutId), eq(workouts.userId, userId)));

  return workout ?? null;
}

export async function updateWorkoutHelper(data: {
  id: string;
  name: string;
  startedAt: Date;
  userId: string;
}) {
  const [workout] = await db
    .update(workouts)
    .set({
      name: data.name,
      startedAt: data.startedAt,
    })
    .where(and(eq(workouts.id, data.id), eq(workouts.userId, data.userId)))
    .returning();

  return workout ?? null;
}
