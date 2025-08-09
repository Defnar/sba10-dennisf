import React, { useState } from "react";
import type { SearchBarProps } from "../utils/types";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar({ currentSearch }: SearchBarProps) {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useDebounce({ input: search, timer: 500, timeoutFunction: currentSearch });

  return (
    <div>
      <input type="text" value={search} onChange={handleChange} />
    </div>
  );
}
