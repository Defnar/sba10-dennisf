import { useEffect, useRef, useState } from "react";
import type { NavBarDropDownProps } from "../utils/types";

export default function NavBarDropDown({
  navHome,
  navFavorite,
  closeDropDown,
}: NavBarDropDownProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [closeable, setCloseable] = useState<boolean>(false);

  useEffect(() => {
    const handleOutsideClicks = (e: MouseEvent) => {
      if (closeable && ref.current && !ref.current.contains(e.target as Node)) {
        closeDropDown();
        setCloseable(false);
      }
    };

    document.addEventListener("click", handleOutsideClicks);
    setCloseable(true);

    return () => {
      document.removeEventListener("click", handleOutsideClicks);
    };
    setCloseable(false);
  }, [closeable, closeDropDown]);

  return (
    <div
      ref={ref}
      tabIndex={0}
      className="absolute top-full -left-10 mt-1 bg-white border rounded shadow-lg w-40 flex flex-col"
    >
      <button onClick={navHome}>Home</button>
      <button onClick={navFavorite}>Favorites</button>
    </div>
  );
}
