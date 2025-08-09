import { useState, type PropsWithChildren } from "react";
import type { ThemeContextType } from "../utils/types";
import { ThemeContext } from "./contexts";

export default function AppProviders({children}: PropsWithChildren) {
    const [theme, setTheme] = useState<ThemeContextType>(window.matchMedia("(prefers-color-scheme: dark)").matches? "dark" : "light")

    const toggleTheme = (theme: ThemeContextType) => {
        setTheme(theme);
    }

    const themeValues = {
        theme: theme,
        toggleTheme: toggleTheme
    }


    return (
        <ThemeContext.Provider value={themeValues}>
            {children}
        </ThemeContext.Provider>
    )

}