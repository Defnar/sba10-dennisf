//when we did the activity on Monday for making a useLocalStorage, I fixed up the code we had as a group and posted 
//the fixed and functional code in discord, for others to see.
//if anyone's is similar to this one, it's likely because they copy/pasted off discord from our activity on Monday (Aug 4th)
//if proof is needed later, I can screenshot my message on discord with time stamps

import { useState } from "react";

export default function useLocalStorage<Data>(
  key: string,
  initialValue: Data
): [Data, (data: Data) => void] {
  //checks if local storage exists, then either pulls from local storage or sets the initial value
  const [storedValue, setStoredValue] = useState<Data>(() => {
    const item = localStorage.getItem(key);
    const data = item ? JSON.parse(item) : initialValue;
    return data;
  });

  const setValue = (data: Data) => {
    localStorage.setItem(key, JSON.stringify(data));
    setStoredValue(data);
  };

  return [storedValue, setValue];
}
