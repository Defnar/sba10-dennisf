import type { NavBarDropDownProps } from "../utils/types";
import { useOutsideClickClose } from "../hooks/useOutsideClickClose";

export default function NavBarDropDown({
  navHome,
  navFavorite,
  closeDropDown,
}: NavBarDropDownProps) {
  const { ref } = useOutsideClickClose(closeDropDown);

  return (
    <div
      ref={ref}
      tabIndex={0}
      className="absolute top-full -left-10 mt-1 bg-white border rounded shadow-lg w-25 flex flex-col"
    >
      <button onClick={navHome}>Home</button>
      <button onClick={navFavorite}>Favorites</button>
    </div>
  );
}
