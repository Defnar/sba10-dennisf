import { useParams } from "react-router-dom";
import generateURL from "../utils/generateURL";
import useFetch from "../hooks/useFetch";
import type { Recipe } from "../utils/types";
import getIngredientArray from "../utils/getIngredientArray";
import { useMemo } from "react";

export default function Recipe() {
  const { idMeal } = useParams();

  //grab recipe from api
  const url = generateURL(`lookup.php?i=${idMeal}`);
  const { loading, data, error } = useFetch<Recipe>(url)

  //grabs the meals array
  const recipeData = useMemo(() => data ? data.meals[0] : null, [data])

  //set up recipe for view
  const ingredients = useMemo(
    () => (recipeData ? getIngredientArray(recipeData) : null),
    [recipeData]
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
      {loading && <p>page loading...</p>}
      {error && <p>{error}</p>}
      {recipeData && (
        <>
          <h2>{recipeData.strMeal}</h2>
          <img
            src={recipeData.strMealThumb}
            alt={`image of ${recipeData.strMeal}`}
          />
          <section>{ingredientSection}</section>
          <p>{recipeData.strInstructions}</p>
        </>
      )}
    </>
  );
}
