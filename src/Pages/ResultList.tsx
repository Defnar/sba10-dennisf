import { Link, useParams } from "react-router-dom";
import type { Meal, Recipe, ResultListProp } from "../utils/types";
import { useCallback, useMemo, useState } from "react";
import generateURL from "../utils/generateURL";
import useFetch from "../hooks/useFetch";
import SearchBar from "../components/SearchBar";
import useLocalStorage from "../hooks/useLocalStorage";

export default function ResultList({ listType }: ResultListProp) {
  const { region, category, letter } = useParams();

  //compared against currently listed recipes for searching
  const [searchResults, setSearchResults] = useState<string>("");

  //grab list of favorites by id, to compare later
  const [favorites, setFavorites] = useLocalStorage<Meal[]>("favorites", []);
  const favoriteIds = useMemo(
    () => favorites.map((recipe) => recipe.idMeal),
    [favorites]
  );

  //saves new favorite to favorites, or removes it
  const toggleFavorite = useCallback((meal: Meal) => {
    if (favoriteIds.includes(meal.idMeal))
      setFavorites(prev => prev.filter((item) => item.idMeal !== meal.idMeal));
    else {
      setFavorites((prev) => [...prev, meal]);
    }
  }, [favoriteIds, setFavorites]);

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
      <li key={meal.idMeal} className="hover:bg-gray-200 rounded-md max-w-xs">
          {/*checking meal ids against favorite ids we populated earlier*/}
          {favoriteIds.includes(meal.idMeal) && <p>Currently in favorites</p>}
          <button onClick={() => toggleFavorite(meal)}>Toggle favorites</button>
          <Link className="flex flex-col px-10 max-w-300 py-5" to={`/recipe/${meal.idMeal}`}>
            <h2 className="text-2xl text-center font-semibold">{meal.strMeal}</h2>
            {meal.strMealThumb && (
              <img src={meal.strMealThumb} className="rounded-md max-w-xs" alt={`image of ${meal.strMeal}`} />
            )}
          </Link>
        </li>
      ));
    } else if (filteredList && filteredList.length === 0) {
      return <p className="font-semibold text-xl text-center">no recipes found</p>;
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
      {listSetup} </ul>
    </div>
  );
}
