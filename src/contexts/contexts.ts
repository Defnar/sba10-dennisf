import { createContext } from "react";
import type { FavoritesContextInterface, ThemeContextProvider } from "../utils/types";

export const ThemeContext = createContext<ThemeContextProvider>({
  theme: "system",
  toggleTheme: () => {},
});


export const FavoritesContext = createContext<FavoritesContextInterface>({
  favorites: [],
  favoriteIds: [],
  toggleFavorite: () => {}
})