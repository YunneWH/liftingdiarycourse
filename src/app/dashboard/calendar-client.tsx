"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useRouter, useSearchParams } from "next/navigation";

export function DashboardCalendar({ selectedDate }: { selectedDate: Date }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [month, setMonth] = useState(selectedDate);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    const params = new URLSearchParams(searchParams.toString());
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    params.set("date", `${year}-${month}-${day}`);
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <Calendar
      mode="single"
      month={month}
      onMonthChange={setMonth}
      selected={selectedDate}
      onSelect={handleDateSelect}
      className="rounded-md"
    />
  );
}
