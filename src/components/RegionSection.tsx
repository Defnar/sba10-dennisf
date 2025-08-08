import { useMemo } from "react";
import useBaseURL from "../hooks/useBaseURL";
import useFetch from "../hooks/useFetch";
import type { RegionData } from "../utils/types";
import { Link } from "react-router-dom";

export default function RegionSection() {
  //create url to follow
  const regionUrl = useBaseURL("list.php?a=list");

  const { loading, data, error } = useFetch<RegionData>(regionUrl);

  const regionSetup = useMemo(() => {
    if (data) {
        console.log(data);
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
  }, [data]);

  return <div>{regionSetup}</div>;
}
