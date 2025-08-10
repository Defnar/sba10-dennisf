import { useContext, useMemo } from "react";
import { ThemeContext } from "../contexts/contexts";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import type { ThemeContextType, ThemeDropDownProp } from "../utils/types";

export default function ThemeDropDown({ closeTheme }: ThemeDropDownProp) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const buildButtons = useMemo(() => {
    const handleThemeChange = (newTheme: ThemeContextType) => {
      toggleTheme(newTheme);
      closeTheme();
    };

    const themeSet: ThemeContextType[] = ["light", "dark", "system"];

    return themeSet.map((item) => (
      <button key={item} onClick={() => handleThemeChange(item)}>
        {" "}
        {item === theme && <CheckCircleIcon />}
        {item}
      </button>
    ));
  }, [closeTheme, theme, toggleTheme]);

  return <div>{buildButtons}</div>;
}
