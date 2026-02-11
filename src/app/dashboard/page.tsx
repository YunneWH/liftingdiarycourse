import { format } from "date-fns";
import { connection } from "next/server";
import { Button } from "@/components/ui/button";
import { getWorkoutsByDate } from "@/data/user-workouts";
import { DashboardCalendar } from "./calendar-client";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  await connection();
  const { date } = await searchParams;
  const selectedDate = date ? new Date(date + "T00:00:00") : new Date();
  const workouts = await getWorkoutsByDate(selectedDate);

  const formatDateWithOrdinal = (d: Date) => format(d, "do MMM yyyy");

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Workout Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Select Date</h2>
          <div className="border rounded-lg p-4">
            <DashboardCalendar selectedDate={selectedDate} />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Workouts for {formatDateWithOrdinal(selectedDate)}
          </h2>

          <div className="space-y-4">
            {workouts.length > 0 ? (
              workouts.map((workout) => (
                <div
                  key={workout.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{workout.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      {format(workout.startedAt, "h:mm a")}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {workout.workoutExercises.map((we) => (
                        <span
                          key={we.id}
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                        >
                          {we.exercise.name}
                        </span>
                      ))}
                    </div>

                    {workout.completedAt && workout.startedAt && (
                      <p className="text-sm text-muted-foreground">
                        Duration:{" "}
                        {Math.round(
                          (workout.completedAt.getTime() -
                            workout.startedAt.getTime()) /
                            60000
                        )}{" "}
                        min
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">
                  No workouts logged for this date
                </p>
                <Button className="mt-4">Log New Workout</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
