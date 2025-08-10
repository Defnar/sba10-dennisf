import { useCallback, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { Meal } from "../utils/types";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  //we will store the meal id for each favorite here, as needed.
  const [favorites, setFavorites] = useLocalStorage<Meal[]>("favorites", []);

  //remove from favorites list
  const removeFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => prev.filter((item) => item.idMeal !== id));
    },
    [setFavorites]
  );

  const displayFavorites = useMemo(() => {
    if (favorites.length === 0)
      return <p>Please pick some of your favorite recipes and favorite them</p>;
    return favorites.map((recipe) => {
      return (
        <li
          className="hover:bg-gray-200 rounded-md max-w-xs"
          key={recipe.idMeal}
        >
          <Link
            className="flex flex-col px-10 max-w-300 py-5"
            to={`/recipe/${recipe.idMeal}`}
          >
            <h2 className="text-2xl text-center font-semibold">
              {recipe.strMeal}
            </h2>
            {recipe.strMealThumb && (
              <img
                src={recipe.strMealThumb}
                className="rounded-md max-w-xs"
                alt={recipe.strMeal}
              />
            )}
            <button onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              removeFavorite(recipe.idMeal)}}>
              remove from favorites
            </button>
          </Link>
        </li>
      );
    });
  }, [favorites, removeFavorite]);

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center">Favorites</h2>
      <ul className="flex flex-row flex-wrap justify-center items-center gap-5 list-none">
        {displayFavorites}
      </ul>
    </div>
  );
}
