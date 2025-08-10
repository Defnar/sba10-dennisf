import React, { useState } from "react";
import type { SearchBarProps } from "../utils/types";
import useDebounce from "../hooks/useDebounce";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export default function SearchBar({
  currentSearch,
  debounceTimer = 0,
  isDynamic,
  displaySearchButton,
}: SearchBarProps) {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  //debounce timer, if the bar isn't dynamic this sets to -1
  useDebounce({
    input: search,
    timer: isDynamic ? debounceTimer : -1,
    timeoutFunction: currentSearch,
  });

  const submitSearch = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (
      (e.type === "keydown" && (e as React.KeyboardEvent).key === "Enter") ||
      e.type === "click"
    ) {
      currentSearch(search);
    }
  };

  return (
    <div className="flex flex-row justify-center gap-2">
      <div className="relative">
        <input
          type="text"
          className="w-50 md:w-150 h-10 border border-gray-300 rounded-md shadow-md px-4"
          placeholder="search for a recipe..."
          value={search}
          onChange={handleChange}
          onKeyDown={submitSearch}
        />
        {search === "" && (
          <MagnifyingGlassIcon
            width={24}
            height={24}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          />
        )}
      </div>
      {displaySearchButton && (
        <button
          type="button"
          className="bg-amber-400 w-20 rounded-md hover:bg-amber-600"
          onClick={submitSearch}
        >
          Search
        </button>
      )}
    </div>
  );
}
