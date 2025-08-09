import { useEffect, useState } from "react";

export default function useLocalStorage<Data>(
  key: string,
  initialValue: Data
): [Data, React.Dispatch<React.SetStateAction<Data>>] {
  //checks if local storage exists, then either pulls from local storage or sets the initial value
  const [storedValue, setStoredValue] = useState<Data>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(
    () => localStorage.setItem(key, JSON.stringify(storedValue)),
    [key, storedValue]
  );

  return [storedValue, setStoredValue];
}
