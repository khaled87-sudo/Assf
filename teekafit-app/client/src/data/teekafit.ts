/**
 * Local demo data for the Teekafit UI.
 *
 * Everything here is placeholder content, structured to mirror the real
 * tables in `drizzle/schema.ts` (nutritionGoals, mealLogs, streaks,
 * exercises, workoutPlans, workoutPlanExercises). Nothing on this page is
 * wired to the backend yet — see README "الحالة الحالية للميزات" for what's
 * real vs. mock.
 */

export type MuscleGroup =
  | "chest"
  | "back"
  | "legs"
  | "shoulders"
  | "arms"
  | "core"
  | "cardio";

export const MUSCLE_GROUP_LABELS: Record<MuscleGroup, string> = {
  chest: "صدر",
  back: "ظهر",
  legs: "أرجل",
  shoulders: "أكتاف",
  arms: "أذرع",
  core: "بطن",
  cardio: "كارديو",
};

export type ExerciseItem = {
  id: number;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: string;
  difficulty: "beginner" | "intermediate" | "advanced";
};

export const DIFFICULTY_LABELS: Record<ExerciseItem["difficulty"], string> = {
  beginner: "مبتدئ",
  intermediate: "متوسط",
  advanced: "متقدم",
};

export const EXERCISE_LIBRARY: ExerciseItem[] = [
  {
    id: 1,
    name: "بنش برس",
    muscleGroup: "chest",
    equipment: "بار حديد",
    difficulty: "intermediate",
  },
  {
    id: 2,
    name: "تفتيح دمبل",
    muscleGroup: "chest",
    equipment: "دمبل",
    difficulty: "beginner",
  },
  {
    id: 3,
    name: "ضغط",
    muscleGroup: "chest",
    equipment: "وزن الجسم",
    difficulty: "beginner",
  },
  {
    id: 4,
    name: "عقلة",
    muscleGroup: "back",
    equipment: "بار عقلة",
    difficulty: "intermediate",
  },
  {
    id: 5,
    name: "تجديف بار",
    muscleGroup: "back",
    equipment: "بار حديد",
    difficulty: "intermediate",
  },
  {
    id: 6,
    name: "سحب أمامي",
    muscleGroup: "back",
    equipment: "جهاز كابل",
    difficulty: "beginner",
  },
  {
    id: 7,
    name: "سكوات",
    muscleGroup: "legs",
    equipment: "بار حديد",
    difficulty: "advanced",
  },
  {
    id: 8,
    name: "لنجز",
    muscleGroup: "legs",
    equipment: "دمبل",
    difficulty: "beginner",
  },
  {
    id: 9,
    name: "ضغط أرجل",
    muscleGroup: "legs",
    equipment: "جهاز",
    difficulty: "beginner",
  },
  {
    id: 10,
    name: "ضغط كتف",
    muscleGroup: "shoulders",
    equipment: "دمبل",
    difficulty: "intermediate",
  },
  {
    id: 11,
    name: "رفرفة جانبية",
    muscleGroup: "shoulders",
    equipment: "دمبل",
    difficulty: "beginner",
  },
  {
    id: 12,
    name: "بايسبس كيرل",
    muscleGroup: "arms",
    equipment: "دمبل",
    difficulty: "beginner",
  },
  {
    id: 13,
    name: "ترايسبس بار",
    muscleGroup: "arms",
    equipment: "جهاز كابل",
    difficulty: "beginner",
  },
  {
    id: 14,
    name: "بلانك",
    muscleGroup: "core",
    equipment: "وزن الجسم",
    difficulty: "beginner",
  },
  {
    id: 15,
    name: "كرنش",
    muscleGroup: "core",
    equipment: "وزن الجسم",
    difficulty: "beginner",
  },
  {
    id: 16,
    name: "جري خفيف",
    muscleGroup: "cardio",
    equipment: "جهاز مشي",
    difficulty: "beginner",
  },
  {
    id: 17,
    name: "قفز حبل",
    muscleGroup: "cardio",
    equipment: "حبل قفز",
    difficulty: "intermediate",
  },
];

export type WorkoutSet = {
  exerciseId: number;
  sets: number;
  reps: number;
};

export type WorkoutDay = {
  id: number;
  name: string;
  dayLabel: string;
  items: WorkoutSet[];
};

export const TODAY_WORKOUT: WorkoutDay = {
  id: 1,
  name: "يوم الصدر والترايسبس",
  dayLabel: "اليوم",
  items: [
    { exerciseId: 1, sets: 4, reps: 8 },
    { exerciseId: 2, sets: 3, reps: 12 },
    { exerciseId: 3, sets: 3, reps: 15 },
    { exerciseId: 13, sets: 3, reps: 12 },
  ],
};

export const WEEK_SCHEDULE: { day: string; workout: string | null }[] = [
  { day: "أحد", workout: "صدر وترايسبس" },
  { day: "اثنين", workout: "ظهر وباي" },
  { day: "ثلاثاء", workout: "أرجل" },
  { day: "أربعاء", workout: null },
  { day: "خميس", workout: "أكتاف وبطن" },
  { day: "جمعة", workout: "كارديو" },
  { day: "سبت", workout: null },
];

export type MealEntry = {
  id: number;
  name: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  loggedAt: string;
};

export const TODAY_MEALS: MealEntry[] = [
  {
    id: 1,
    name: "بيض وشوفان",
    calories: 420,
    proteinG: 28,
    carbsG: 45,
    fatG: 12,
    loggedAt: "07:30",
  },
  {
    id: 2,
    name: "صدر دجاج وأرز",
    calories: 610,
    proteinG: 52,
    carbsG: 60,
    fatG: 14,
    loggedAt: "13:15",
  },
  {
    id: 3,
    name: "بروتين شيك",
    calories: 190,
    proteinG: 30,
    carbsG: 8,
    fatG: 3,
    loggedAt: "16:00",
  },
];

export const NUTRITION_GOAL = {
  dailyCalories: 2400,
  proteinG: 160,
  carbsG: 240,
  fatG: 70,
};

export const STREAK = {
  currentStreak: 6,
  longestStreak: 14,
};

export function sumMeals(meals: MealEntry[]) {
  return meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      proteinG: acc.proteinG + m.proteinG,
      carbsG: acc.carbsG + m.carbsG,
      fatG: acc.fatG + m.fatG,
    }),
    { calories: 0, proteinG: 0, carbsG: 0, fatG: 0 }
  );
}
