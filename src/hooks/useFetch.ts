import { useEffect, useState } from "react";

export default function useFetch<APIData>(url: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<APIData | null>();
  const [error, setError] = useState<string | null>();
  console.log(url);

  //fetch data with abort signal timeout
  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);

    //sets up api timeouts and user aborts
    const controller = new AbortController();
    const abortTimeout = setTimeout(() => {
      controller.abort();
    }, 5000);

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          setError("Request timed out or user cancelled");
        else setError((error as Error).message);
      } finally {
        clearTimeout(abortTimeout);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
      clearTimeout(abortTimeout);
    };
  }, [url]);

  return {loading, data, error};
}
