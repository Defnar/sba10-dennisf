import { Link, useParams } from "react-router-dom";
import type { Recipe, ResultListProp } from "../utils/types";
import { useMemo, useState } from "react";
import generateURL from "../utils/generateURL";
import useFetch from "../hooks/useFetch";
import SearchBar from "../components/SearchBar";

export default function ResultList({ listType }: ResultListProp) {
  const { region, category, letter } = useParams();

  const [searchResults, setSearchResults] = useState<string>("");

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

  const filteredList = useMemo(() => {
    if (data)
      return data.meals.filter((recipe) => {
        return recipe.strMeal
          .toLowerCase()
          .includes(searchResults.toLowerCase().trim());
      });
  }, [data, searchResults]);

  //create a list of categories or regions to render
  const listSetup = useMemo(() => {
    if (loading) return <p>Loading section...</p>;
    if (filteredList) {
      return filteredList.map((meal) => (
        <Link key={meal.idMeal} to={`/recipe/${meal.idMeal}`}>
          <h3>{meal.strMeal}</h3>
          {meal.strMealThumb && (
            <img src={meal.strMealThumb} alt={`image of ${meal.strMeal}`} />
          )}
        </Link>
      ));
    }

    if (error) return <p>{error}</p>;
  }, [filteredList, error, loading]);

  return (
    <div>
      <SearchBar
        currentSearch={setSearchResults}
        debounceTimer={250}
        isDynamic={true}
        displaySearchButton={false}
      />
      {listSetup}
    </div>
  );
}
