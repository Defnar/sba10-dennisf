import { useNavigate } from "react-router-dom"

export default function Header() {

    const navigate = useNavigate();


    const handleBack = () => {
        navigate(-1);
    }

    const navHome = () => {
        navigate("/")
    }
    
    const navFavorite = () => {
        navigate("/favorites")
    }

    return (
        <div className="border-solid border-black w-full">
            <button type="button" onClick={handleBack}>Back</button>
            <button type="button" onClick={navHome}>Home</button>
            <h1>Recipes</h1>
            <button type="button" onClick={navFavorite}>Favorites</button>
        </div>
    )
}