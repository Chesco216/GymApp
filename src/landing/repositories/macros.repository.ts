import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Food, FoodSearchResult } from "../interfaces/food";

const BASE_URL = "https://foodmacros.onrender.com/macros";

export const fetchMacros = async (): Promise<Food[]> => {
  const res = await fetch(BASE_URL);
  return (await res.json()) as Food[];
};

export const fetchMacrosByCategory = async (category: string): Promise<Food[]> => {
  const url = category === "todos" ? BASE_URL : `${BASE_URL}/${category}`;
  const res = await fetch(url);
  return (await res.json()) as Food[];
};

const searchEngine = async (name: string): Promise<string> => {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY as string);
  const data = await fetchMacros();
  const names = data.map((item) => item.nombre);

  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
  const prompt = `si te digo ${name} con cual de los siguientes alimentos los asocias? ${names.join(", ")}, si no lo asocias con ninguno solo retorname ninguno`;
  const result = await model.generateContent(prompt);
  return result.response.text().toLowerCase();
};

export const searchFoodByName = async (name: string): Promise<FoodSearchResult> => {
  const nombre = await searchEngine(name);
  const data = await fetchMacros();
  const dataFiltered = data.filter((item) => item.nombre === nombre);
  return {
    retVal: dataFiltered.length === 0 ? data : dataFiltered,
    found: dataFiltered.length !== 0,
  };
};
