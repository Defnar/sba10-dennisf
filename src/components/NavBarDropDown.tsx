import type { NavBarDropDownProps } from "../utils/types";
import { useOutsideClickClose } from "../hooks/useOutsideClickClose";

export default function NavBarDropDown({
  navHome,
  navFavorite,
  closeDropDown,
}: NavBarDropDownProps) {
  const { ref } = useOutsideClickClose(closeDropDown);

  const buttonStyles = "hover:cursor-pointer hover:bg-blue-200 w-full text-center"
  return (
    <div
      ref={ref}
      className="absolute top-full -left-10 mt-1 bg-white border rounded shadow-lg w-25 flex flex-col"
    >
      <button className={buttonStyles} onClick={navHome}>Home</button>
      <button className={buttonStyles} onClick={navFavorite}>Favorites</button>
    </div>
  );
}
