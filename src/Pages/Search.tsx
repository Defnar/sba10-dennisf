import SearchBar from "../components/SearchBar";
import useFetch from "../hooks/useFetch";
import generateURL from "../utils/generateURL";
import { type Recipe } from "../utils/types";
import RecipeList from "../components/RecipeList";
import { useCallback, useState } from "react";

export default function Search() {
  const [searchValue, setSearchValue] = useState<string>("");

  const currentSearch = useCallback((input: string) => {
    setSearchValue(input);
  }, []);

  const url =
    searchValue !== "" ? generateURL(`search.php?s=${searchValue}`) : null;

  const { loading, data, error } = useFetch<Recipe>(url);
  console.log(data);

  return (
    <div className="flex flex-col gap-5">
      <SearchBar
        currentSearch={currentSearch}
        isDynamic={false}
        displaySearchButton={true}
      />
      {searchValue === "" && (
        <p className="text-center font-semibold text-xl">
          Look up some recipes! There are many delicious choices here!
        </p>
      )}
      {searchValue !== "" && data && !data.meals && (
        <p className="text-center font-semibold text-xl">No recipes match your search</p>
      )}
      {searchValue !== "" && (
        <RecipeList
          meals={(data && data.meals) || undefined}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
}
