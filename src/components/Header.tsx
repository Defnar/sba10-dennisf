import { useNavigate } from "react-router-dom"

export default function Header() {

    const navigate = useNavigate();


    const handleBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <button type="button" onClick={handleBack}>Back</button>
        </div>
    )
}