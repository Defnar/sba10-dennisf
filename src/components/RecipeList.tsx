import { useContext, useMemo } from "react";
import { FavoritesContext } from "../contexts/contexts";
import { BookmarkSlashIcon, BookmarkIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import SpinnerWheel from "./SpinnerWheel";
import type { Meal } from "../utils/types";

interface RecipeList {
  meals: Meal[] | undefined;
  loading: boolean;
  error: string | null;
}

export default function RecipeList({ meals, loading, error }: RecipeList) {
  const { favoriteIds, toggleFavorite } = useContext(FavoritesContext);


  //create list for display
  const listSetup = useMemo(() => {
    if (loading) return <SpinnerWheel />;
    if (meals && meals.length > 0) {
      return meals.map((meal) => (
        <li
          key={meal.idMeal}
          className="group hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md max-w-xs relative"
        >
          <button
            className="hidden group-hover:block absolute top-2 right-2"
            onClick={() => {
              toggleFavorite(meal);
            }}
          >
            {favoriteIds.includes(meal.idMeal) ? (
              <BookmarkSlashIcon width={20} height={20} />
            ) : (
              <BookmarkIcon width={20} height={20} />
            )}
          </button>
          <Link
            className="flex flex-col px-10 max-w-300 py-5"
            to={`/recipe/${meal.idMeal}`}
          >
            <h2 className="text-2xl text-center font-semibold">
              {meal.strMeal}
            </h2>
            {meal.strMealThumb && (
              <img
                src={meal.strMealThumb}
                className="object-cover rounded-md max-w-xs"
                alt={`image of ${meal.strMeal}`}
              />
            )}
          </Link>
        </li>
      ));
    } else if (meals && meals.length === 0) {
      return (
        <p className="font-semibold text-xl text-center">no recipes found</p>
      );
    }

    if (error) return <p>{error}</p>;
  }, [loading, meals, error, favoriteIds, toggleFavorite]);

  return (
    <ul className="flex flex-row flex-wrap justify-center items-center gap-5 list-none">
      {listSetup}
    </ul>
  );
}
