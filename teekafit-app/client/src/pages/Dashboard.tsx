import { Card, CardContent } from "@/components/ui/card";
import {
  NUTRITION_GOAL,
  STREAK,
  TODAY_MEALS,
  TODAY_WORKOUT,
  sumMeals,
} from "@/data/teekafit";
import { Dumbbell, Flame, UtensilsCrossed } from "lucide-react";
import { Link } from "wouter";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "صباح الخير";
  if (hour < 18) return "مساء الخير";
  return "مساء النشاط";
}

export default function Dashboard() {
  const eaten = sumMeals(TODAY_MEALS);
  const remaining = Math.max(NUTRITION_GOAL.dailyCalories - eaten.calories, 0);
  const progressPct = Math.min(
    Math.round((eaten.calories / NUTRITION_GOAL.dailyCalories) * 100),
    100
  );

  return (
    <div className="px-5 pt-6 space-y-6">
      <div>
        <p className="text-zinc-400 text-sm">{greeting()} 👋</p>
        <h1 className="text-2xl font-bold mt-1">جاهز تكسر روتينك اليوم؟</h1>
      </div>

      {/* Streak */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-lime-400/10 flex items-center justify-center">
              <Flame className="h-5 w-5 text-lime-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">أيام متتالية</p>
              <p className="text-xl font-bold">{STREAK.currentStreak} 🔥</p>
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm text-zinc-400">أطول سلسلة</p>
            <p className="text-lg font-semibold text-zinc-200">
              {STREAK.longestStreak} يوم
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Calories */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">السعرات اليوم</p>
            <p className="text-sm text-zinc-400">
              {eaten.calories} / {NUTRITION_GOAL.dailyCalories} سعرة
            </p>
          </div>
          <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-lime-400 rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="text-xs text-zinc-500">
            متبقّي {remaining} سعرة للوصول لهدفك اليومي
          </p>
        </CardContent>
      </Card>

      {/* Quick nav */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/workouts">
          <Card className="bg-zinc-900 border-zinc-800 hover:border-lime-400/50 transition-colors cursor-pointer">
            <CardContent className="p-4 space-y-2">
              <Dumbbell className="h-5 w-5 text-lime-400" />
              <p className="font-semibold">{TODAY_WORKOUT.name}</p>
              <p className="text-xs text-zinc-500">
                {TODAY_WORKOUT.items.length} تمارين اليوم
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/nutrition">
          <Card className="bg-zinc-900 border-zinc-800 hover:border-lime-400/50 transition-colors cursor-pointer">
            <CardContent className="p-4 space-y-2">
              <UtensilsCrossed className="h-5 w-5 text-lime-400" />
              <p className="font-semibold">{TODAY_MEALS.length} وجبات مسجّلة</p>
              <p className="text-xs text-zinc-500">
                {eaten.proteinG}غ بروتين اليوم
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
