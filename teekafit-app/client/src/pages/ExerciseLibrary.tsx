import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DIFFICULTY_LABELS,
  EXERCISE_LIBRARY,
  MUSCLE_GROUP_LABELS,
  type MuscleGroup,
} from "@/data/teekafit";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

const GROUPS: (MuscleGroup | "all")[] = [
  "all",
  ...(Object.keys(MUSCLE_GROUP_LABELS) as MuscleGroup[]),
];

export default function ExerciseLibrary() {
  const [group, setGroup] = useState<MuscleGroup | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return EXERCISE_LIBRARY.filter(ex => {
      const matchesGroup = group === "all" || ex.muscleGroup === group;
      const matchesQuery = ex.name.includes(query.trim());
      return matchesGroup && matchesQuery;
    });
  }, [group, query]);

  return (
    <div className="px-5 pt-6 space-y-6">
      <div>
        <p className="text-zinc-400 text-sm">مكتبة التمارين</p>
        <h1 className="text-2xl font-bold mt-1">اختر تمرينك</h1>
      </div>

      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="ابحث عن تمرين..."
          className="bg-zinc-900 border-zinc-800 pr-9"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5">
        {GROUPS.map(g => (
          <button
            key={g}
            onClick={() => setGroup(g)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm border transition-colors ${
              group === g
                ? "bg-lime-400 text-black border-lime-400"
                : "border-zinc-800 text-zinc-400 hover:border-zinc-600"
            }`}
          >
            {g === "all" ? "الكل" : MUSCLE_GROUP_LABELS[g]}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(ex => (
          <Card key={ex.id} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{ex.name}</p>
                <p className="text-xs text-zinc-500">
                  {MUSCLE_GROUP_LABELS[ex.muscleGroup]} · {ex.equipment}
                </p>
              </div>
              <span className="text-xs rounded-full px-2.5 py-1 bg-zinc-800 text-zinc-300">
                {DIFFICULTY_LABELS[ex.difficulty]}
              </span>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-zinc-500 text-sm py-8">
            ما فيه نتائج مطابقة
          </p>
        )}
      </div>
    </div>
  );
}
