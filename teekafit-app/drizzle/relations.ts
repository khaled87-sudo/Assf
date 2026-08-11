import { relations } from "drizzle-orm";
import {
  exercises,
  mealLogs,
  nutritionGoals,
  streaks,
  users,
  workoutPlanExercises,
  workoutPlans,
} from "./schema";

export const usersRelations = relations(users, ({ one, many }) => ({
  nutritionGoal: one(nutritionGoals, {
    fields: [users.id],
    references: [nutritionGoals.userId],
  }),
  streak: one(streaks, {
    fields: [users.id],
    references: [streaks.userId],
  }),
  workoutPlans: many(workoutPlans),
  mealLogs: many(mealLogs),
}));

export const workoutPlansRelations = relations(workoutPlans, ({ many }) => ({
  planExercises: many(workoutPlanExercises),
}));

export const workoutPlanExercisesRelations = relations(
  workoutPlanExercises,
  ({ one }) => ({
    plan: one(workoutPlans, {
      fields: [workoutPlanExercises.workoutPlanId],
      references: [workoutPlans.id],
    }),
    exercise: one(exercises, {
      fields: [workoutPlanExercises.exerciseId],
      references: [exercises.id],
    }),
  })
);

export const exercisesRelations = relations(exercises, ({ many }) => ({
  planExercises: many(workoutPlanExercises),
}));
