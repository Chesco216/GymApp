export interface FoodMacros {
  calorias: number;
  proteinas: number;
  grasa: number;
  vitaminas: string;
  minerales: string;
}

export interface Food {
  nombre: string;
  macros: FoodMacros;
  img?: string;
  descripcion?: string;
}

export interface FoodSearchResult {
  retVal: Food[];
  found: boolean;
}
