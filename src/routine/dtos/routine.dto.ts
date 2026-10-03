import { z } from "zod";

const exerciseSchema = z.object({
  set: z.string(),
  description: z.string(),
  series: z.string(),
  reps: z.string(),
});

const workoutDaySchema = z.object({
  day: z.enum(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]),
  group: z.string(),
  exercises: z.array(exerciseSchema),
  cals: z.string(),
  duration: z.string(),
});

// Final schema: array of workout days (also used as Gemini responseJsonSchema)
export const trainingRoutineSchema = z.array(workoutDaySchema);

export type TrainingRoutineDto = z.infer<typeof trainingRoutineSchema>;
