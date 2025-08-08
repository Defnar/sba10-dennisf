import { useMemo } from "react";
import useFetch from "../hooks/useFetch";
import type { RegionData } from "../utils/types";
import { Link } from "react-router-dom";
import generateURL from "../utils/generateURL";

export default function RegionSection() {
  //create url to follow
  const url = generateURL("list.php?a=list");

  const { loading, data, error } = useFetch<RegionData>(url);

  const regionSetup = useMemo(() => {
    if (data) {
      return data.meals.map((region) => (
        <Link key={region.strArea} to={`/region/${region.strArea}`}>
          {region.strArea}
        </Link>
      ));
    }
    if (loading) {
      return <p>Loading regions...</p>;
    }
    if (error) {
      return <p>{error}</p>;
    }
  }, [data, loading, error]);

  return <div>{regionSetup}</div>;
}
