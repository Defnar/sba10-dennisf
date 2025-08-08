import { useMemo } from "react";
import RegionSection from "../components/RegionSection";
export default function HomePage() {
  //am lazy
  const letterArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  //turn letters into buttons for search by starting letter
  const letterButtons = useMemo(
    () => letterArray.map((letter) => <button value={letter}>{letter}</button>),
    []
  );

  //fetch data to show in each home page region
  return (
    <div>
      <button type="button">Surprise Me</button>
      <h2>Region</h2>
      <RegionSection />
      <h2>Category</h2>
    </div>
  );
}
