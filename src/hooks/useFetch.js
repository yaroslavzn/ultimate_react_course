import { useEffect, useState } from 'react';

export const BASE_API_URL = 'http://localhost:3200';

const useFetch = (url, initialData) => {
  const [data, setData] = useState(initialData || null);
  const [isLoading, setIsLoading] = useState(!Boolean(data));

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_API_URL}${url}`, {
          signal: abortController.signal,
        });
        const data = await res.json();
        setData(data);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { data, isLoading };
};

export default useFetch;
