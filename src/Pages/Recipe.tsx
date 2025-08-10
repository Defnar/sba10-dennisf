import { useParams } from "react-router-dom";
import generateURL from "../utils/generateURL";
import useFetch from "../hooks/useFetch";
import type { Recipe, RecipeProp } from "../utils/types";
import { useContext, useEffect, useMemo, useState } from "react";
import getIngredientArray from "../utils/getIngredientArray";
import { FavoritesContext } from "../contexts/contexts";

export default function Recipe({ isRandom = false }: RecipeProp) {
  const { idMeal } = useParams();

  //checks if the meal is in the favorites, grab from storage and save to idlist
  const [isFavorite, setIsFavorite] = useState<boolean>(false);


  const {favorites, favoriteIds, toggleFavorite} = useContext(FavoritesContext)

  //grab recipe from api
  const url = generateURL(!isRandom ? `lookup.php?i=${idMeal}` : `random.php`);
  const { loading, data, error } = useFetch<Recipe>(url);

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
              <p>
                {item.measures} {item.ingredients}
              </p>
            </div>
          );
        })
      ) : (
        <p>No ingredients found</p>
      ),
    [ingredients]
  );

  //keeps track of whether item is in favorites and updates state
  useEffect(() => {
    if (!recipeData) return;
    setIsFavorite(favoriteIds.includes(recipeData.idMeal));
  }, [favoriteIds, favorites, recipeData]);

 
  return (
    <>
      {loading && <p>page loading...</p>}
      {error && <p>{error}</p>}
      {recipeData && (
        <div className="flex flex-col items-center gap-10 px-10 py-5">
          <h2 className="font-semibold text-2xl">{recipeData.strMeal}</h2>
          <button type="button" onClick={() => toggleFavorite(recipeData)}>
            {!isFavorite ? "Add to" : "Remove from"} Favorites
          </button>
          <div className="flex flex-col items-center gap-10 lg:flex-row">
            {recipeData.strMealThumb && (
              <img
                className="object-cover rounded-md"
                src={recipeData.strMealThumb}
                alt={`image of ${recipeData.strMeal}`}
              />
            )}
            <div className="flex flex-col gap-20">
              <section>{ingredientSection}</section>
              <p className="text-gray-800 dark:text-gray-200">{recipeData.strInstructions}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
