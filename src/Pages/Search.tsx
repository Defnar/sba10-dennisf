import { useCallback, useEffect, useMemo, useState } from "react"
import SearchBar from "../components/SearchBar"
import useFetch from "../hooks/useFetch";
import generateURL from "../utils/generateURL";

export default function SearchPage() {

    const [searchValue, setSearchValue] = useState<string>("");

    const currentSearch = useCallback((input: string) => {
        setSearchValue(input)
    }, [])
    

    const url = searchValue!==""? generateURL(`search.php?s=${searchValue}`) : null

    const {loading, data, error}= useFetch(url);

    const searchResults = useMemo(() => searchValue===""? <p>Please search a recipe in the search bar</p> : 
{

}, [searchValue]  

)

    return (
    <div>
        <SearchBar currentSearch={currentSearch} isDynamic={false} displaySearchButton={true}/>
    </div>
    )
}