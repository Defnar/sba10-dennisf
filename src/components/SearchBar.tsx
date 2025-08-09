import React, { useState } from "react";
import type { SearchBarProps } from "../utils/types";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar({ currentSearch, debounceTimer = 0, isDynamic }: SearchBarProps) {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };


  //debounce timer 
  useDebounce({ input: search, timer: isDynamic? -1: debounceTimer, timeoutFunction: currentSearch });

const submitSearch = (e: React.KeyboardEvent | React.MouseEvent<HTMLButtonElement>) => {
  if (e instanceof KeyboardEvent && e.key === "Enter" || e instanceof MouseEvent) {
    currentSearch(search);
  }
}

  return (
    <div>
      <input type="text" value={search} onChange={handleChange} onKeyDown={submitSearch} />
      <button type="button" onClick={submitSearch}>Search</button>
    </div>
  );
}
