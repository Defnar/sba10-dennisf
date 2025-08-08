import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { CategoryData } from "../utils/types";
import { useMemo } from "react";
import generateURL from "../utils/generateURL";

export default function CategorySection() {
  //create url to follow
  const url = generateURL("categories.php");

  const { loading, data, error } = useFetch<CategoryData>(url);

  const categorySetup = useMemo(() => {
    if (data) {
      return data.categories.map((category) => (

        <Link
          key={category.idCategory}
          to={`/category/${category.strCategory}`}
        >
          <img src={category.strCategoryThumb} alt={`example of ${category.strCategory}`} loading="lazy"/>
          <h2>{category.strCategory}</h2>
          <p>{category.strCategoryDescription}</p>
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
