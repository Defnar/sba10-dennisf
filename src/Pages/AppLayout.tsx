import { useState } from "react"
import { Route, Routes } from "react-router-dom";
import HomePage from "./Home";

export default function AppLayout() {

    const [showSearch, setShowSearch] = useState<boolean>(false);



    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    )
}