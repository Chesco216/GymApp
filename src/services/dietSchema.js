import { z } from 'zod';

const ingredientSchema = z.object({
  name: z.string().describe('Nombre del ingrediente'),
  quantity: z.string().describe('Cantidad de los ingredientes en la comida'),
});

const macrosSchema = z.object({
  proteins: z.string().describe('Proteínas totales de la comida con unidad (ej. 10 gr)'),
  calories: z.string().describe('Calorías totales de la comida con unidad (ej. 10 cals)'),
  vitamins: z.array(z.string()).describe('Vitaminas que provee la comida'),
  minerals: z.array(z.string()).describe('Minerales que proporciona la comida'),
});

const mealSchema = z.object({
  meal_time: z.string().describe('Momento del día (ej. Desayuno, Almuerzo)'),
  name: z.string().describe('Nombre de la comida'),
  description: z.string().describe('Descripción detallada de la comida e ingredientes'),
  ingredients: z.array(ingredientSchema),
  macros: macrosSchema,
});

const dayPlanSchema = z.object({
  day: z.enum([
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
  ]),
  meals: z.array(mealSchema),
});

// Este es el esquema final que representa el array de días
export const dietPlanSchema = z.array(dayPlanSchema);

