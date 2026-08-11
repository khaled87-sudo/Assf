import {
  decimal,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Per-user daily nutrition targets, editable from the profile/onboarding flow.
 * One row per user — upserted, never multiplied.
 */
export const nutritionGoals = mysqlTable("nutritionGoals", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  dailyCalories: int("dailyCalories").notNull().default(2200),
  proteinG: int("proteinG").notNull().default(150),
  carbsG: int("carbsG").notNull().default(220),
  fatG: int("fatG").notNull().default(70),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type NutritionGoal = typeof nutritionGoals.$inferSelect;
export type InsertNutritionGoal = typeof nutritionGoals.$inferInsert;

/** Logged-in-streak tracking (consecutive days the user opened/used the app). */
export const streaks = mysqlTable("streaks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  currentStreak: int("currentStreak").notNull().default(0),
  longestStreak: int("longestStreak").notNull().default(0),
  /** Date-only (YYYY-MM-DD) of the last day counted toward the streak. */
  lastActiveDate: varchar("lastActiveDate", { length: 10 }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Streak = typeof streaks.$inferSelect;
export type InsertStreak = typeof streaks.$inferInsert;

/**
 * Shared exercise library, grouped by muscle group. Not user-specific —
 * seeded once and referenced by workoutPlanExercises.
 */
export const exercises = mysqlTable("exercises", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  muscleGroup: mysqlEnum("muscleGroup", [
    "chest",
    "back",
    "legs",
    "shoulders",
    "arms",
    "core",
    "cardio",
  ]).notNull(),
  equipment: varchar("equipment", { length: 120 }),
  difficulty: mysqlEnum("difficulty", ["beginner", "intermediate", "advanced"])
    .default("beginner")
    .notNull(),
  instructions: text("instructions"),
});

export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = typeof exercises.$inferInsert;

/** A user's workout schedule entry — e.g. "Push Day", assigned to a weekday. */
export const workoutPlans = mysqlTable("workoutPlans", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: text("name").notNull(),
  dayOfWeek: mysqlEnum("dayOfWeek", [
    "sun",
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
  ]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type WorkoutPlan = typeof workoutPlans.$inferSelect;
export type InsertWorkoutPlan = typeof workoutPlans.$inferInsert;

/** Join row: which exercises (with sets/reps) belong to a workout plan, in order. */
export const workoutPlanExercises = mysqlTable("workoutPlanExercises", {
  id: int("id").autoincrement().primaryKey(),
  workoutPlanId: int("workoutPlanId").notNull(),
  exerciseId: int("exerciseId").notNull(),
  sets: int("sets").notNull().default(3),
  reps: int("reps").notNull().default(10),
  order: int("order").notNull().default(0),
});

export type WorkoutPlanExercise = typeof workoutPlanExercises.$inferSelect;
export type InsertWorkoutPlanExercise =
  typeof workoutPlanExercises.$inferInsert;

/** A single logged meal/food entry counted toward the day's nutrition totals. */
export const mealLogs = mysqlTable("mealLogs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: text("name").notNull(),
  calories: int("calories").notNull(),
  proteinG: decimal("proteinG", { precision: 6, scale: 1 })
    .notNull()
    .default("0"),
  carbsG: decimal("carbsG", { precision: 6, scale: 1 }).notNull().default("0"),
  fatG: decimal("fatG", { precision: 6, scale: 1 }).notNull().default("0"),
  loggedAt: timestamp("loggedAt").defaultNow().notNull(),
});

export type MealLog = typeof mealLogs.$inferSelect;
export type InsertMealLog = typeof mealLogs.$inferInsert;

// TODO: Add more tables here as the feature set grows (e.g. workout session
// history / completed-set logging, once the schedule builder needs progress
// tracking beyond "today's plan").
