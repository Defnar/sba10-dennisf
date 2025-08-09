import { useCallback, useEffect, useState } from "react"
import SearchBar from "../components/SearchBar"
import useFetch from "../hooks/useFetch";
import generateURL from "../utils/generateURL";

export default function SearchPage() {

    const [searchValue, setSearchValue] = useState<string>("");

    const currentSearch = useCallback((input: string) => {
        setSearchValue(input)
    }, [])
    

    const url = searchValue!==""? generateURL(`search.php?s=${searchValue}`) : null


    return (
    <div>
        <SearchBar currentSearch={currentSearch} debounceTimer={500}/>
    </div>
    )
}