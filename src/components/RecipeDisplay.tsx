import { useMemo } from "react";
import getIngredientArray from "../utils/getIngredientArray";
import type { Meal } from "../utils/types";

interface RecipeData{
    recipe: Meal;
}

export default function RecipeDisplay({recipe}: RecipeData) {
      //set up recipe for view
      const ingredients = useMemo(
        () => (recipe ? getIngredientArray(recipe) : null),
        [recipe]
      );
    
      
    
    
      const ingredientSection = useMemo(
        () =>
          ingredients ? (
            ingredients.map((item, index) => {
              return (
                <div key={index}>
                  <p>{item.measures}</p> <p>{item.ingredients}</p>
                </div>
              );
            })
          ) : (
            <p>No ingredients found</p>
          ),
        [ingredients]
      );

      return (
        <>
          <h2>{recipe.strMeal}</h2>
          <img
            src={recipe.strMealThumb}
            alt={`image of ${recipe.strMeal}`}
          />
          <section>{ingredientSection}</section>
          <p>{recipe.strInstructions}</p>
        </>
      )
}