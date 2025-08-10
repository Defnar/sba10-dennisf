import { useCallback, useMemo } from "react";
import type { Meal } from "../utils/types";
import useLocalStorage from "./useLocalStorage";

interface UseCheckFavorite {
    favoriteIds: string[];
    toggleFavorite: (meal: Meal) => void;
}

export default function useCheckFavorites():UseCheckFavorite {
    const [favorites, setFavorites] = useLocalStorage<Meal[]>("favorites", [])

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

      return {favoriteIds, toggleFavorite}
}