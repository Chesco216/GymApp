import { z } from "zod";

const ingredientSchema = z.object({
  name: z.string(),
  quantity: z.string(),
});

const macrosSchema = z.object({
  proteins: z.string(),
  calories: z.string(),
  vitamins: z.array(z.string()),
  minerals: z.array(z.string()),
});

const mealSchema = z.object({
  meal_time: z.string(),
  name: z.string(),
  description: z.string(),
  ingredients: z.array(ingredientSchema),
  macros: macrosSchema,
});

const dayPlanSchema = z.object({
  day: z.enum(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]),
  meals: z.array(mealSchema),
});

// Final schema: array of days (also used as Gemini responseJsonSchema)
export const dietPlanSchema = z.array(dayPlanSchema);

export type DietPlanDto = z.infer<typeof dietPlanSchema>;
