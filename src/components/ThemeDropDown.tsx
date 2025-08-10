import { useContext, useMemo } from "react";
import { ThemeContext } from "../contexts/contexts";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import type { ThemeContextType, ThemeDropDownProp } from "../utils/types";
import { useOutsideClickClose } from "../hooks/useOutsideClickClose";

export default function ThemeDropDown({ closeTheme }: ThemeDropDownProp) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { ref } = useOutsideClickClose(closeTheme);

  //build button list with check beside selected element
  const buildButtons = useMemo(() => {
    const handleThemeChange = (newTheme: ThemeContextType) => {
      toggleTheme(newTheme);
      closeTheme();
    };

    const themeSet: ThemeContextType[] = ["light", "dark", "system"];

    return themeSet.map((item) => (
      <button className="flex flex-row self-center" key={item} onClick={() => handleThemeChange(item)}>
        {item === theme && <CheckCircleIcon height={24} width={24}/>}
        {item}
      </button>
    ));
  }, [closeTheme, theme, toggleTheme]);

  return <div className="absolute top-full right-5 bg-white border rounded w-20 flex flex-col" ref={ref}>{buildButtons}</div>;
}
