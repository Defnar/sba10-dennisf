import { Link, useParams } from "react-router-dom";
import type { MealList, ResultListProp } from "../utils/types";
import { useMemo } from "react";
import generateURL from "../utils/generateURL";
import useFetch from "../hooks/useFetch";

export default function ResultList({ listType }: ResultListProp) {
  const { region, category } = useParams();

  const endOfUrl = useMemo(() => {
    switch (listType) {
      case "category":
        return `filter.php?c=${category}`;
      case "region":
        return `filter.php?a=${region}`;
    }
  }, [category, region, listType]);

  //api call to grab list of whichever we need here
  const url = generateURL(endOfUrl);
  const { loading, data, error } = useFetch<MealList>(url);

  //create a list of categories or regions to render
  const listSetup = useMemo(() => {
    if (loading) return <p>Loading section...</p>;
    if (error) return <p>{error}</p>;
    if (data) {
      return data.meals.map((meal) => (
        <Link key={meal.idMeal} to={`/recipe/${meal.idMeal}`}>
          <h3>{meal.strMeal}</h3>
          <img src={meal.strMealThumb} alt={`image of ${meal.strMeal}`} />
        </Link>
      ));
    }
  }, [data, error, loading]);

  return <div>{listSetup}</div>;
}
