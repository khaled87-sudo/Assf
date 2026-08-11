import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  EXERCISE_LIBRARY,
  TODAY_WORKOUT,
  WEEK_SCHEDULE,
  type ExerciseItem,
} from "@/data/teekafit";
import { useState } from "react";

const exerciseById = new Map<number, ExerciseItem>(
  EXERCISE_LIBRARY.map(e => [e.id, e])
);

export default function Workouts() {
  const [done, setDone] = useState<Set<number>>(new Set());

  const toggle = (exerciseId: number) => {
    setDone(prev => {
      const next = new Set(prev);
      if (next.has(exerciseId)) next.delete(exerciseId);
      else next.add(exerciseId);
      return next;
    });
  };

  return (
    <div className="px-5 pt-6 space-y-6">
      <div>
        <p className="text-zinc-400 text-sm">{TODAY_WORKOUT.dayLabel}</p>
        <h1 className="text-2xl font-bold mt-1">{TODAY_WORKOUT.name}</h1>
        <p className="text-xs text-zinc-500 mt-1">
          {done.size} / {TODAY_WORKOUT.items.length} مكتمل
        </p>
      </div>

      <div className="space-y-3">
        {TODAY_WORKOUT.items.map(item => {
          const exercise = exerciseById.get(item.exerciseId);
          const isDone = done.has(item.exerciseId);
          if (!exercise) return null;
          return (
            <Card
              key={item.exerciseId}
              className={`bg-zinc-900 border-zinc-800 transition-colors ${isDone ? "border-lime-400/50" : ""}`}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <Checkbox
                  checked={isDone}
                  onCheckedChange={() => toggle(item.exerciseId)}
                  className="h-5 w-5"
                />
                <div className="flex-1">
                  <p
                    className={`font-semibold ${isDone ? "line-through text-zinc-500" : ""}`}
                  >
                    {exercise.name}
                  </p>
                  <p className="text-xs text-zinc-500">{exercise.equipment}</p>
                </div>
                <p className="text-sm text-lime-400 font-mono">
                  {item.sets} × {item.reps}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-zinc-400 mb-3">
          جدول الأسبوع
        </h2>
        <div className="grid grid-cols-7 gap-2">
          {WEEK_SCHEDULE.map(d => (
            <div
              key={d.day}
              className="flex flex-col items-center gap-1 rounded-lg bg-zinc-900 border border-zinc-800 p-2 text-center"
            >
              <span className="text-[10px] text-zinc-500">{d.day}</span>
              <span
                className={`h-2 w-2 rounded-full ${d.workout ? "bg-lime-400" : "bg-zinc-700"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
