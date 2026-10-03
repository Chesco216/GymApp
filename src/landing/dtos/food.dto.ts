import { z } from "zod";

export const foodMacrosSchema = z.object({
  calorias: z.number(),
  proteinas: z.number(),
  grasa: z.number(),
  vitaminas: z.string(),
  minerales: z.string(),
});

export const foodSchema = z.object({
  nombre: z.string().min(1),
  macros: foodMacrosSchema,
  img: z.string().nullish(),
  descripcion: z.string().nullish(),
});

export type FoodDto = z.infer<typeof foodSchema>;
