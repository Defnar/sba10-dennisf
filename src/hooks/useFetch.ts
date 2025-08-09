import { useEffect, useState } from "react";

export default function useFetch<APIData>(url: string | null) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<APIData | null>(null);
  const [error, setError] = useState<string | null>(null);

  //fetch data with abort signal timeout
  useEffect(() => {
    setError(null);
    setData(null);
    console.log(1, error);
    let isMounted = true;

    //if url is empty, immediately exits
    if (!url) return;
    setLoading(true);

    //sets up api timeouts and user aborts
    const controller = new AbortController();
    const abortTimeout = setTimeout(() => {
      controller.abort();
    }, 5000);

    //fetches data or returns error
    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const responseData = await response.json();
        if (isMounted) setData(responseData);
      } catch (error) {
        if (!isMounted) return;
        if (error instanceof DOMException && error.name === "AbortError")
          setError("Request timed out or user cancelled");
        else setError((error as Error).message);
      } finally {
        clearTimeout(abortTimeout);
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(abortTimeout);
    };
  }, [error, url]);

  console.log(2, loading, data, error);
  return { loading, data, error };
}
