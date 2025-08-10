import { useParams } from "react-router-dom";
import type { Recipe, ResultListProp } from "../utils/types";
import { useMemo, useState } from "react";
import generateURL from "../utils/generateURL";
import useFetch from "../hooks/useFetch";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";

export default function ResultList({ listType }: ResultListProp) {
  const { region, category, letter } = useParams();

  //compared against currently listed recipes for searching
  const [searchResults, setSearchResults] = useState<string>("");

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

  return (
    <div className="flex flex-col gap-5">
      <SearchBar
        currentSearch={setSearchResults}
        debounceTimer={250}
        isDynamic={true}
        displaySearchButton={false}
      />
      <ul className="flex flex-row flex-wrap justify-center items-center gap-5 list-none">
        <RecipeList loading={loading} meals={filteredList} error={error} />
      </ul>
    </div>
  );
}
