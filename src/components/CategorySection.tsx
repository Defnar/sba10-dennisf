import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { CategoryData } from "../utils/types";
import { useMemo } from "react";
import generateURL from "../utils/generateURL";

export default function CategorySection() {
  //create url to follow
  const url = generateURL("list.php?c=list");

  const { loading, data, error } = useFetch<CategoryData>(url);

  const categorySetup = useMemo(() => {
    if (data) {
      return data.meals.map((category) => (
        <Link
          key={category.strCategory}
          to={`/category/${category.strCategory}`}
        >
          {category.strCategory}
        </Link>
      ));
    }
    if (loading) {
      return <p>Loading Categories...</p>;
    }
    if (error) {
      return <p>{error}</p>;
    }
  }, [data, loading, error]);

  return <div>{categorySetup}</div>
}
