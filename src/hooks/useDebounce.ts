import { useEffect } from "react"

interface DebounceParams {
    input: string,
    timer: number,
    timeoutFunction: (input: string) => void
}

//I could have probably just did this in search by itself
//but I decided to skip lab 2 as it was optional...
//I wanted to try making my own debounce hook here instead of lab 2
export default function useDebounce({input, timer, timeoutFunction}:DebounceParams) {
   
    useEffect(() => {
    if (timer < 0) return;
    const debounceTimer = setTimeout(() => {
        timeoutFunction(input)
    }, timer)
    return () => {
        clearTimeout(debounceTimer);
    }
   }, [input, timer, timeoutFunction])
}