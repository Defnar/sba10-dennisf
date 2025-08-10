import { Link, useParams } from "react-router-dom";
import type { Recipe, ResultListProp } from "../utils/types";
import { useMemo, useState } from "react";
import generateURL from "../utils/generateURL";
import useFetch from "../hooks/useFetch";
import SearchBar from "../components/SearchBar";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import {BookmarkSlashIcon} from "@heroicons/react/24/solid";
import useCheckFavorites from "../hooks/useCheckFavorite";

export default function ResultList({ listType }: ResultListProp) {
  const { region, category, letter } = useParams();

  //compared against currently listed recipes for searching
  const [searchResults, setSearchResults] = useState<string>("");

  const {favoriteIds, toggleFavorite} = useCheckFavorites();

  //create end of url based on what the result list is populating
  const endOfUrl = useMemo(() => {
    switch (listType) {
      case "category":
        return `filter.php?c=${category}`;
      case "region":
        return `filter.php?a=${region}`;
      case "letter":
        return `search.php?f=${letter}`;
    }
  }, [category, region, listType, letter]);

  //api call to grab list of whichever we need here
  const url = generateURL(endOfUrl);
  const { loading, data, error } = useFetch<Recipe>(url);

  //creating a filtered list using the search results
  const filteredList = useMemo(() => {
    if (data && data.meals)
      return data.meals.filter((recipe) => {
        return recipe.strMeal
          .toLowerCase()
          .includes(searchResults.toLowerCase().trim());
      });
    else if (data && !data.meals) return [];
  }, [data, searchResults]);

  //create a list of categories or regions to render
  const listSetup = useMemo(() => {
    if (loading) return <p>Loading section...</p>;
    if (filteredList && filteredList.length > 0) {
      return filteredList.map((meal) => (
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
            {favoriteIds.includes(meal.idMeal)? <BookmarkSlashIcon width={20} height={20}/> : <BookmarkIcon width={20} height={20}/>}
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
                className="rounded-md max-w-xs"
                alt={`image of ${meal.strMeal}`}
              />
            )}
          </Link>
        </li>
      ));
    } else if (filteredList && filteredList.length === 0) {
      return (
        <p className="font-semibold text-xl text-center">no recipes found</p>
      );
    }

    if (error) return <p>{error}</p>;
  }, [loading, filteredList, error, favoriteIds, toggleFavorite]);

  return (
    <div className="flex flex-col gap-5">
      <SearchBar
        currentSearch={setSearchResults}
        debounceTimer={250}
        isDynamic={true}
        displaySearchButton={false}
      />
      <ul className="flex flex-row flex-wrap justify-center items-center gap-5 list-none">
        {listSetup}{" "}
      </ul>
    </div>
  );
}
