import { Link } from "react-router-dom";

export default function PageNotFound() {
    return <p className="text-center text-2xl">Page not found, Return <Link className="underline text-amber-700 hover:text-amber-900 dark:text-amber-500 dark:hover:text-amber-300 " to="/">home here</Link></p>
}