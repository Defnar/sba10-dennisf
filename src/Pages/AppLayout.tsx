import { useState } from "react"
import { Routes } from "react-router-dom";

export default function AppLayout() {

    const [showSearch, setShowSearch] = useState<boolean>(true);



    return (
        {showSearch && (<SearchBars />)}
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/" element={<SearchPage />} />
            <Route path="/recipe/*" element={<RecipePage />} />
        </Routes>
    )
}