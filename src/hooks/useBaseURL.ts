export default function useGenerateURL(url: string): string {
    return `https://www.themealdb.com/api/json/v1/1/${url}`
}
