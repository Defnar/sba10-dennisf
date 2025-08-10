import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../contexts/contexts";

export default function FavoritesPage() {
  //we will store the meal id for each favorite here, as needed.
  const {favorites, toggleFavorite} = useContext(FavoritesContext);


  const displayFavorites = useMemo(() => {
    if (favorites.length === 0)
      return <p>Please pick some of your favorite recipes and favorite them</p>;
    return favorites.map((recipe) => {
      return (
        <li
          className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md max-w-xs"
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
            <button 
            className="hover:text-red-700 dark:hover:text-red-300 mt-4"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleFavorite(recipe)}}>
              remove from favorites
            </button>
          </Link>
        </li>
      );
    });
  }, [favorites, toggleFavorite]);

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center">Favorites</h2>
      <ul className="flex flex-row flex-wrap justify-center items-center gap-5 list-none">
        {displayFavorites}
      </ul>
    </div>
  );
}
