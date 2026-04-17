import { z } from 'zod';

const exerciseSchema = z.object({
  set: z.string().describe('Nombre del ejercicio'),
  description: z.string().describe('Breve descripción de la técnica de ejecución'),
  series: z.string().describe('Número de series con unidad (ej. 3 series)'),
  reps: z.string().describe('Número de repeticiones con unidad (ej. 10 repeticiones)'),
});

const workoutDaySchema = z.object({
  day: z.enum([
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
  ]),
  group: z.string().describe('Grupo muscular a trabajar (ej. Pecho y tríceps)'),
  exercises: z.array(exerciseSchema),
  cals: z.string().describe('Calorías aproximadas quemadas con unidad (ej. 15 cal)'),
  duration: z.string().describe('Duración total en minutos (ej. 120 minutos)'),
});

// Esquema final que es un array de días de entrenamiento
export const trainingRoutineSchema = z.array(workoutDaySchema);
