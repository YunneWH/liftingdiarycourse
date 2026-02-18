"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateWorkout } from "./actions";

interface EditWorkoutFormProps {
  workout: {
    id: string;
    name: string;
    startedAt: Date;
  };
}

export function EditWorkoutForm({ workout }: EditWorkoutFormProps) {
  const router = useRouter();
  const [name, setName] = useState(workout.name);
  const [date, setDate] = useState(
    workout.startedAt.toISOString().split("T")[0]
  );
  const [time, setTime] = useState(
    workout.startedAt.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const [errors, setErrors] = useState<Record<string, string[]> | string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setIsSubmitting(true);

    const result = await updateWorkout({ workoutId: workout.id, name, date, time });

    if (result.success) {
      router.push("/dashboard");
    } else {
      setErrors(result.errors);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Workout Name</Label>
        <Input
          id="name"
          placeholder="e.g. Push Day, Leg Day"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {typeof errors === "object" && errors?.name && (
          <p className="text-sm text-destructive">{errors.name[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {typeof errors === "object" && errors?.date && (
          <p className="text-sm text-destructive">{errors.date[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Start Time</Label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        {typeof errors === "object" && errors?.time && (
          <p className="text-sm text-destructive">{errors.time[0]}</p>
        )}
      </div>

      {typeof errors === "string" && (
        <p className="text-sm text-destructive">{errors}</p>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
