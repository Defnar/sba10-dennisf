import { useParams } from "react-router-dom";
import generateURL from "../utils/generateURL";
import useFetch from "../hooks/useFetch";
import type { Recipe, RecipeProp } from "../utils/types";
import { useMemo } from "react";
import getIngredientArray from "../utils/getIngredientArray";

export default function Recipe({ isRandom = false }: RecipeProp) {
  const { idMeal } = useParams();

  //grab recipe from api
  const url = generateURL(!isRandom ? `lookup.php?i=${idMeal}` : `random.php`);
  console.log(url);
  const { loading, data, error } = useFetch<Recipe>(url);

  console.log(data);

  //grabs the meals array
  const recipeData = useMemo(() => (data ? data.meals[0] : null), [data]);

  //grabs an ingredients and measure array from the recipe data
  const ingredients = useMemo(
    () => (recipeData ? getIngredientArray(recipeData) : null),
    [recipeData]
  );

  //creates a visual display out of the ingredients and measures array
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
      {loading && <p>page loading...</p>}
      {error && <p>{error}</p>}
      {recipeData && (
        <div>
          <h2>{recipeData.strMeal}</h2>
          {recipeData.strMealThumb && (
            <img
              src={recipeData.strMealThumb}
              alt={`image of ${recipeData.strMeal}`}
            />
          )}
          <section>{ingredientSection}</section>
          <p>{recipeData.strInstructions}</p>
        </div>
      )}
    </>
  );
}
