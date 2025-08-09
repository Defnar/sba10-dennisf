import { useNavigate } from "react-router-dom"

export default function Header() {

    const navigate = useNavigate();


    const handleBack = () => {
        navigate(-1);
    }

    const navHome = () => {
        navigate("/")
    }

    return (
        <div>
            <button type="button" onClick={handleBack}>Back</button>
            <button type="button" onClick={navHome}>Home</button>
        </div>
    )
}