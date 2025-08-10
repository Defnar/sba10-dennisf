import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import type { CategoryData } from "../utils/types";
import { useMemo } from "react";
import generateURL from "../utils/generateURL";
import SpinnerWheel from "./SpinnerWheel";

export default function CategorySection() {
  //create url to follow
  const url = generateURL("categories.php");

  const { loading, data, error } = useFetch<CategoryData>(url);

  const categorySetup = useMemo(() => {
    if (data) {
      return data.categories.map((category) => (
        <Link
          key={category.idCategory}
          className="flex flex-col md:flex-row hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md shadow-sm gap-1"
          to={`/category/${category.strCategory}`}
        >
          <img
            src={category.strCategoryThumb}
            className="max-w-500"
            alt={`example of ${category.strCategory}`}
            loading="lazy"
          />
          <div className="flex flex-col grow justify-center ">
            <h2 className="text-center text-2xl font-semibold">
              {category.strCategory}
            </h2>
            <p className="text-center">{category.strCategoryDescription}</p>
          </div>
        </Link>
      ));
    }
    if (loading) {
      return <SpinnerWheel />;
    }
    if (error) {
      return <p>{error}</p>;
    }
  }, [data, loading, error]);

  return <div className="px-4 py-2">{categorySetup}</div>;
}
