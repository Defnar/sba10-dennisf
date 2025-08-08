export default function useGenerateURL(url: string): {newURL: string} {
    return {newURL: `www.themealdb.com/api/json/v1/1/${url}`}
}
