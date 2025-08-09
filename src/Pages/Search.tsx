import { useCallback, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import useFetch from "../hooks/useFetch";
import generateURL from "../utils/generateURL";
import type { Recipe } from "../utils/types";
import { Link } from "react-router-dom";

export default function Search() {
  const [searchValue, setSearchValue] = useState<string>("");

  const currentSearch = useCallback((input: string) => {
    setSearchValue(input);
  }, []);

  const url =
    searchValue !== "" ? generateURL(`search.php?s=${searchValue}`) : null;

  const { loading, data, error } = useFetch<Recipe>(url);

  const searchResults = useMemo(() => {
    if (searchValue === "")
      return <p>Please ensure the search bar is not empty</p>;
    if (loading) return <p>Loading page..</p>;
    if (error) return <p>{error}</p>;
    if (data) {
      return data.meals.map((recipe) => {
        return <li key={recipe.idMeal}>
          <Link to={`recipe/${recipe.idMeal}`}>
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          </Link>
        </li>;
      });
    }
  }, [searchValue, data, loading, error]);

  return (
    <div>
      <SearchBar
        currentSearch={currentSearch}
        isDynamic={false}
        displaySearchButton={true}
      />
      <ul>{searchResults}</ul>
    </div>
  );
}
