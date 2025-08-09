import { useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { Meal } from "../utils/types";

export default function FavoritesPage() {
  //we will store the meal id for each favorite here, as needed.
  const [favorites, setFavorites] = useLocalStorage<Meal[]>("favorites", []);

  const displayFavorites = useMemo(() => {
    if (favorites.length === 0)
      return <p>Please pick some of your favorite recipes and favorite them</p>;
    return favorites.map((recipe) => {
      return (
        <div>
          <h2>{recipe.strMeal}</h2>
          {recipe.strMealThumb && (
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          )}
          <button>remove from favorites</button>
        </div>
      );
    });
  }, [favorites]);

  return (
    <div>
      <h1>Favorites</h1>
      <div>{displayFavorites}</div>
    </div>
  );
}
