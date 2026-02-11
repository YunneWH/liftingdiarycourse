import { db } from "@/db";
import { workouts } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and, gte, lt } from "drizzle-orm";
import { startOfDay, endOfDay } from "date-fns";

export async function getWorkoutsByDate(date: Date) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  return db.query.workouts.findMany({
    where: and(
      eq(workouts.userId, userId),
      gte(workouts.startedAt, dayStart),
      lt(workouts.startedAt, dayEnd)
    ),
    with: {
      workoutExercises: {
        with: {
          exercise: true,
          sets: true,
        },
        orderBy: (workoutExercises, { asc }) => [
          asc(workoutExercises.order),
        ],
      },
    },
    orderBy: (workouts, { asc }) => [asc(workouts.startedAt)],
  });
}
