import { useCallback, useMemo, useState } from "react";
import type { Meal, ThemeContextType } from "../utils/types";
import { FavoritesContext, ThemeContext } from "./contexts";
import useLocalStorage from "../hooks/useLocalStorage";

interface AppProviders {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProviders) {
  const [theme, setTheme] = useState<ThemeContextType>(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  //////////////Theme providers////////////////////////
  const toggleTheme = (theme: ThemeContextType) => {
    setTheme(theme);
  };

  const themeValues = {
    theme: theme,
    toggleTheme: toggleTheme,
  };

  /////////////////favorite providers//////////////////////////
  const [favorites, setFavorites] = useLocalStorage<Meal[]>("favorites", []);

  const favoriteIds = useMemo(
    () => favorites.map((recipe) => recipe.idMeal),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (meal: Meal) => {
      if (favoriteIds.includes(meal.idMeal))
        setFavorites((prev) =>
          prev.filter((item) => item.idMeal !== meal.idMeal)
        );
      else {
        setFavorites((prev) => [...prev, meal]);
      }
    },
    [favoriteIds, setFavorites]
  );

  const favoriteValues = { favorites, favoriteIds, toggleFavorite };

  return (
    <ThemeContext.Provider value={themeValues}>
      <FavoritesContext.Provider value={favoriteValues}>
        {children}
      </FavoritesContext.Provider>
    </ThemeContext.Provider>
  );
}
