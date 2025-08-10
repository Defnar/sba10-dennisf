import { createContext } from "react";
import type { ThemeContextProvider } from "../utils/types";

export const ThemeContext = createContext<ThemeContextProvider>({
  theme: "system",
  toggleTheme: () => {},
});
