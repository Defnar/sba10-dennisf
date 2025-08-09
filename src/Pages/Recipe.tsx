import { useParams } from "react-router-dom";
import generateURL from "../utils/generateURL";
import useFetch from "../hooks/useFetch";
import type { Recipe } from "../utils/types";
import { useMemo } from "react";
import RecipeDisplay from "../components/RecipeDisplay";

export default function Recipe() {
  const { idMeal } = useParams();

  //grab recipe from api
  const url = generateURL(`lookup.php?i=${idMeal}`);
  const { loading, data, error } = useFetch<Recipe>(url);

  //grabs the meals array
  const recipeData = useMemo(() => (data ? data.meals[0] : null), [data]);



  return (
    <>
      {loading && <p>page loading...</p>}
      {error && <p>{error}</p>}
      {recipeData && <RecipeDisplay recipe={recipeData} />}
    </>
  );
}
