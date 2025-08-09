import { useParams } from "react-router-dom";
import generateURL from "../utils/generateURL";
import useFetch from "../hooks/useFetch";
import type { Meal, Recipe, RecipeProp } from "../utils/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import getIngredientArray from "../utils/getIngredientArray";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Recipe({ isRandom = false }: RecipeProp) {
  const { idMeal } = useParams();

  //checks if the meal is in the favorites, grab from storage and save to idlist
  const [favorites, setFavorites] = useLocalStorage<Meal[]>("favorites", []);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

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

  //keeps track of whether item is in favorites and updates state
  useEffect(() => {
    if (!recipeData) return;
    const favoriteIds = favorites.map((fav) => fav.idMeal);
    setIsFavorite(favoriteIds.includes(recipeData.idMeal));
  }, [favorites, recipeData]);

  //toggles favorite
  const toggleFavorite = useCallback(() => {
    if (!recipeData) return;
    return isFavorite
      ? setFavorites((prev) =>
          prev.filter((item) => item.idMeal != recipeData.idMeal)
        )
      : setFavorites((prev) => [...prev, recipeData]);
  }, [recipeData, isFavorite, setFavorites]);

  return (
    <>
      {loading && <p>page loading...</p>}
      {error && <p>{error}</p>}
      {recipeData && (
        <div>
          <h2>{recipeData.strMeal}</h2>
          {isFavorite && <p>Meal is in favorites</p>}
          <button type="button" onClick={toggleFavorite}>
            Store to Favorites
          </button>
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
