import React, { useMemo } from "react";
import RegionSection from "../components/RegionSection";
import CategorySection from "../components/CategorySection";
import { Link, useNavigate } from "react-router-dom";
import AccordionSection from "../components/AccordionSection";

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
    return objectToReturn;
  }, []);

  //turn letters into buttons for search by starting letter
  const letterButtons = useMemo(
    () =>
      letterArray.map((letter) => (
        <React.Fragment key={letter}>
          <Link
            className="hover:cursor-pointer w-4 text-center hover:bg-amber-400 dark:hover:bg-amber-700"
            to={`/list/${letter.toLowerCase()}`}
          >
            {letter}
          </Link>{" "}
          {letter != "Z" && <p> | </p>}
        </React.Fragment>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const buttonStyles =
    "font-semibold w-40 py-2 bg-amber-400 hover:bg-amber-600 dark:bg-amber-800 dark:hover:bg-amber-700 hover:cursor-pointer my-2 self-center rounded-md shadow-md";
  //fetch data to show in each home page region
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:justify-center">
      <button
        type="button"
        className={buttonStyles}
        onClick={() => handleNavigate(navigatePages.searchPage)}
      >
        Search for a recipe
      </button>
      <button
        type="button"
        className={buttonStyles}
        onClick={() => handleNavigate(navigatePages.randomPage)}
      >
        Surprise Me
      </button>
      </div>
      <p className="text-3xl text-center text-black">
        Or, select from a region or category
      </p>
      <AccordionSection title="Region">
        <RegionSection />
      </AccordionSection>
      <AccordionSection title="Category">
        <CategorySection />
      </AccordionSection>

      <h2 className="text-center font-semibold">Unsure, find recipes by letter</h2>
      <div className="flex flex-row gap-2 justify-center text-center">{letterButtons}</div>
    </div>
  );
}
