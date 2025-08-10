import { useCallback, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { Meal } from "../utils/types";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  //we will store the meal id for each favorite here, as needed.
  const [favorites, setFavorites] = useLocalStorage<Meal[]>("favorites", []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites(prev => prev.filter(item => item.idMeal !== id))
  }, [setFavorites])


  const displayFavorites = useMemo(() => {
    if (favorites.length === 0)
      return <p>Please pick some of your favorite recipes and favorite them</p>;
    return favorites.map((recipe) => {
      return (
        <Link key={recipe.idMeal} to={`/recipe/${recipe.idMeal}`}>
          <h2>{recipe.strMeal}</h2>
          {recipe.strMealThumb && (
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          )}
          <button onClick={() => removeFavorite(recipe.idMeal)}>remove from favorites</button>
        </Link>
      );
    });
  }, [favorites, removeFavorite]);

  return (
    <div>
      <h1>Favorites</h1>
      <div>{displayFavorites}</div>
    </div>
  );
}
