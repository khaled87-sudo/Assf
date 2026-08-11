import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NUTRITION_GOAL,
  TODAY_MEALS,
  sumMeals,
  type MealEntry,
} from "@/data/teekafit";
import { Plus } from "lucide-react";
import { useState } from "react";

type MacroKey = "proteinG" | "carbsG" | "fatG";

const MACROS: { key: MacroKey; label: string; goal: number }[] = [
  { key: "proteinG", label: "بروتين", goal: NUTRITION_GOAL.proteinG },
  { key: "carbsG", label: "كارب", goal: NUTRITION_GOAL.carbsG },
  { key: "fatG", label: "دهون", goal: NUTRITION_GOAL.fatG },
];

function emptyForm() {
  return { name: "", calories: "", proteinG: "", carbsG: "", fatG: "" };
}

export default function Nutrition() {
  const [meals, setMeals] = useState<MealEntry[]>(TODAY_MEALS);
  const [form, setForm] = useState(emptyForm());
  const [open, setOpen] = useState(false);

  const totals = sumMeals(meals);

  const addMeal = () => {
    if (!form.name.trim() || !form.calories) return;
    const entry: MealEntry = {
      id: Date.now(),
      name: form.name.trim(),
      calories: Number(form.calories) || 0,
      proteinG: Number(form.proteinG) || 0,
      carbsG: Number(form.carbsG) || 0,
      fatG: Number(form.fatG) || 0,
      loggedAt: new Date().toLocaleTimeString("ar", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMeals(prev => [...prev, entry]);
    setForm(emptyForm());
    setOpen(false);
  };

  return (
    <div className="px-5 pt-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-zinc-400 text-sm">اليوم</p>
          <h1 className="text-2xl font-bold mt-1">متتبع التغذية</h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="bg-lime-400 text-black hover:bg-lime-300 rounded-full"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent dir="rtl">
            <DialogHeader>
              <DialogTitle>إضافة وجبة</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="meal-name">اسم الوجبة</Label>
                <Input
                  id="meal-name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="مثال: صدر دجاج وأرز"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="meal-calories">سعرات</Label>
                  <Input
                    id="meal-calories"
                    type="number"
                    inputMode="numeric"
                    value={form.calories}
                    onChange={e =>
                      setForm(f => ({ ...f, calories: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="meal-protein">بروتين (غ)</Label>
                  <Input
                    id="meal-protein"
                    type="number"
                    inputMode="numeric"
                    value={form.proteinG}
                    onChange={e =>
                      setForm(f => ({ ...f, proteinG: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="meal-carbs">كارب (غ)</Label>
                  <Input
                    id="meal-carbs"
                    type="number"
                    inputMode="numeric"
                    value={form.carbsG}
                    onChange={e =>
                      setForm(f => ({ ...f, carbsG: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="meal-fat">دهون (غ)</Label>
                  <Input
                    id="meal-fat"
                    type="number"
                    inputMode="numeric"
                    value={form.fatG}
                    onChange={e =>
                      setForm(f => ({ ...f, fatG: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline">إلغاء</Button>
              </DialogClose>
              <Button
                onClick={addMeal}
                className="bg-lime-400 text-black hover:bg-lime-300"
              >
                إضافة
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">إجمالي السعرات</p>
            <p className="text-lg font-bold">
              {totals.calories}{" "}
              <span className="text-zinc-500 font-normal">
                / {NUTRITION_GOAL.dailyCalories}
              </span>
            </p>
          </div>
          {MACROS.map(m => {
            const value = totals[m.key];
            const pct = Math.min(Math.round((value / m.goal) * 100), 100);
            return (
              <div key={m.key} className="space-y-1">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span>{m.label}</span>
                  <span>
                    {value.toFixed(0)}غ / {m.goal}غ
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-lime-400 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-400">
          الوجبات المسجّلة
        </h2>
        {meals.map(meal => (
          <Card key={meal.id} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{meal.name}</p>
                <p className="text-xs text-zinc-500">
                  {meal.loggedAt} · {meal.proteinG}غ بروتين
                </p>
              </div>
              <p className="text-sm text-lime-400 font-mono">
                {meal.calories} سعرة
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
