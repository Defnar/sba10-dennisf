import { useMemo } from "react";
import RegionSection from "../components/RegionSection";
import CategorySection from "../components/CategorySection";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  //am lazy
  const letterArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    navigate(page);
  };

  //hard coded paths to pages for home buttons
  const navigatePages = useMemo(() => {
    const objectToReturn = {
      searchPage: "/search/",
      randomPage: "/random",
    };
    return objectToReturn
  }, []);

  //turn letters into buttons for search by starting letter
  const letterButtons = useMemo(
    () =>
      letterArray.map((letter) => (
        <Link key={letter} to={`/list/${letter.toLowerCase()}`}>
          {letter}
        </Link>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  //fetch data to show in each home page region
  return (
    <div>
      <button type="button" onClick={() => handleNavigate(navigatePages.searchPage)}>
        Search for a recipe
      </button>
      <button type="button" onClick={() => handleNavigate(navigatePages.randomPage)}>
        Surprise Me
      </button>
      <h2>Unsure, find recipes by letter</h2>
      {letterButtons}
      <p>Or, select from a region or category</p>
      <h2>Region</h2>
      <RegionSection />
      <h2>Category</h2>
      <CategorySection />
    </div>
  );
}
