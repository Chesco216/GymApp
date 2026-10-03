export interface DietIngredient {
  name: string;
  quantity: string;
}

export interface DietMealMacros {
  proteins: string;
  calories: string;
  vitamins: string[];
  minerals: string[];
}

export interface DietMeal {
  meal_time: string;
  name: string;
  description: string;
  ingredients: DietIngredient[];
  macros: DietMealMacros;
}

export interface DietDayPlan {
  day: string;
  meals: DietMeal[];
}

export type DietPlan = DietDayPlan[];
