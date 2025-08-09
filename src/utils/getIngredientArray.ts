import type { IngredientMeasure, Meal } from "./types";

export default function getIngredientArray(
  recipe: Meal
): IngredientMeasure[] {
  const returnIngredients = [];


  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof Meal];
    const measure = recipe[`strMeasure${i}` as keyof Meal];

    if (!ingredient || ingredient === "") break;

    returnIngredients.push({ ingredients: ingredient, measures: measure });
  }

  return returnIngredients;
}
