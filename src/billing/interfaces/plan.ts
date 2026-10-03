export interface Plan {
  plan: string;
  price: number;
  utils: string[];
}

export const plans: Plan[] = [
  {
    plan: "Standar",
    price: 0,
    utils: ["Obtiene las macros para tu dia a dia", "Rutinas y dietas"],
  },
  {
    plan: "Premium",
    price: 2.99,
    utils: [
      "Obtiene las macros para tu dia a dia",
      "Rutinas y dietas personalizadas",
      "Crea una nueva rutina cuando quieras",
    ],
  },
];
