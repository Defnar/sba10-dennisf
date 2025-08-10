import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { MoonIcon } from "@heroicons/react/24/solid";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import NavBarDropDown from "./NavBarDropDown";
import ThemeDropDown from "./ThemeDropDown";

export default function Header() {
  const navigate = useNavigate();
  const [navDropDown, setNavDropDown] = useState<boolean>(false);
  const [themeDropDown, setThemeDropDown] = useState<boolean>(false);

  const closeDropDown = () => {
    setNavDropDown(false);
  };

  const closeThemeDropDown = () => {
    setThemeDropDown(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const navHome = () => {
    navigate("/");
    closeDropDown();
  };

  const navFavorite = () => {
    navigate("/favorites");
    closeDropDown();
  };

  return (
    <div className="w-full flex items-center flex-row px-6 py-3 justify-between">
      <button type="button" onClick={handleBack}>
        <ArrowLeftIcon width={24} height={24} />{" "}
      </button>
      <h1 className="text-3xl font-bold md:grow md:text-center">Recipes</h1>
      <nav className="relative md:hidden">
        <Bars3Icon
          height={24}
          width={24}
          onClick={() => setNavDropDown((prev) => !prev)}
        />
        {navDropDown && (
          <NavBarDropDown
            navHome={navHome}
            navFavorite={navFavorite}
            closeDropDown={closeDropDown}
          />
        )}
      </nav>
      <nav className="hidden md:flex gap-5 shrink md:mr-40">
        <button type="button" onClick={navHome}>
          Home
        </button>
        <p>|</p>
        <button type="button" onClick={navFavorite}>
          Favorites
        </button>
      </nav>
      <div className="relative">
        <button type="button" onClick={() => setThemeDropDown((prev) => !prev)}>
          <MoonIcon width={24} height={24} />
        </button>
        {themeDropDown && <ThemeDropDown closeTheme={closeThemeDropDown} />}
      </div>
    </div>
  );
}
