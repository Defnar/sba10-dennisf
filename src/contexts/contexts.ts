import { createContext } from "react";
import type { ThemeContextProvider } from "../utils/types";

export const ThemeContext = createContext<ThemeContextProvider>({
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  toggleTheme: () => {},
});
