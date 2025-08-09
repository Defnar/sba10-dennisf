import { useEffect } from "react"

interface DebounceParams {
    input: string,
    timer: number,
    timeoutFunction: (input: string) => void
}

//I could have probably just did this in search by itself
//but I decided to skip lab 2 as it was optional...
//I wanted to try making my own debounce hook here instead of lab3
export default function useDebounce({input, timer, timeoutFunction}:DebounceParams) {
   useEffect(() => {
    const debounceTimer = setTimeout(() => {
        timeoutFunction(input)
    }, timer)
    return () => {
        clearTimeout(debounceTimer);
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [input, timer])
}