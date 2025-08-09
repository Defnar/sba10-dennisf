import React, { useState } from "react";
import type { SearchBarProps } from "../utils/types";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar({ currentSearch, debounceTimer = 0, isDynamic, displaySearchButton }: SearchBarProps) {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };


  //debounce timer, if the bar isn't dynamic this sets to -1
  useDebounce({ input: search, timer: isDynamic? debounceTimer : -1, timeoutFunction: currentSearch });

const submitSearch = (e: React.KeyboardEvent | React.MouseEvent<HTMLButtonElement>) => {
  if (e instanceof KeyboardEvent && e.key === "Enter" || e instanceof MouseEvent) {
    currentSearch(search);
  }
}

  return (
    <div>
      <input type="text" value={search} onChange={handleChange} onKeyDown={submitSearch} />
      {displaySearchButton && <button type="button" onClick={submitSearch}>Search</button>}
    </div>
  );
}
