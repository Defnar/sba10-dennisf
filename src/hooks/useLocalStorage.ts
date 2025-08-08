
//when we did the activity on Monday for making a useLocalStorage, I posted my solution to discord for others to view and get an idea
//after i went in and fixed it up, and made sure it functioned as intended.
//if anyone's is similar to this one, it's likely because they copy/pasted off discord from our activity on Monday (Aug 4th)
//if proof is needed later, I can screenshot my message on discord with time stamps

import { useState } from "react";

export default function useLocalStorage<Data>(key: string, initialValue: Data): [Data,(data: Data) => void] {

    //checks if local storage exists, then either pulls from local storage or sets the initial value
    const [storedValue, setStoredValue] = useState<Data>(() => {
        const item = localStorage.getItem(key);
        const data = item? JSON.parse(item) : initialValue;
        return data;
    })

    const setValue = (data: Data) => {
        localStorage.setItem(key, JSON.stringify(data));
        setStoredValue(data);
    };

    return [storedValue, setValue];
}