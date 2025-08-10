import { useCallback, useContext, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import useFetch from "../hooks/useFetch";
import generateURL from "../utils/generateURL";
import { type Recipe } from "../utils/types";
import { Link } from "react-router-dom";
import { BookmarkSlashIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { FavoritesContext } from "../contexts/contexts";

export default function Search() {
  const [searchValue, setSearchValue] = useState<string>("");

  const { favoriteIds, toggleFavorite } = useContext(FavoritesContext);

  const currentSearch = useCallback((input: string) => {
    setSearchValue(input);
  }, []);

  const url =
    searchValue !== "" ? generateURL(`search.php?s=${searchValue}`) : null;

  const { loading, data, error } = useFetch<Recipe>(url);

  const searchResults = useMemo(() => {
    const resultStyles = "text-lg text-center mt-10";
    if (searchValue === "")
      return (
        <p className={resultStyles}>
          Please ensure the search bar is not empty
        </p>
      );
    if (loading) return <p className="text-center">Loading page..</p>;
    if (error) return <p className="text-center">{error}</p>;
    if (data && data.meals) {
      return data.meals.map((recipe) => {
        return (
          <li
            className="group relative hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md max-w-xs"
            key={recipe.idMeal}
          >
            <button
              className="hidden group-hover:block absolute top-2 right-2"
              onClick={() => {console.log("saving ", recipe); toggleFavorite(recipe)}}
            >
              {favoriteIds.includes(recipe.idMeal) ? (
                <BookmarkSlashIcon width={20} height={20} />
              ) : (
                <BookmarkIcon width={20} height={20} />
              )}
            </button>
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
                  className="object-cover rounded-md max-w-xs"
                  alt={recipe.strMeal}
                />
              )}
            </Link>
          </li>
        );
      });
    }
    if (data && !data.meals) {
      return <p className={resultStyles}>No matches found</p>;
    }
  }, [searchValue, loading, error, data, favoriteIds, toggleFavorite]);

  return (
    <div className="flex flex-col gap-5">
      <SearchBar
        currentSearch={currentSearch}
        isDynamic={false}
        displaySearchButton={true}
      />
      <ul className="flex flex-row flex-wrap justify-center items-center gap-5 list-none">
        {searchResults}
      </ul>
    </div>
  );
}
