import { useEffect, useState } from 'react';
import { API_KEY } from '../constants/constants';

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const loadMoviesData = async () => {
      try {
        callback();
        setError(null);
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: abortController.signal }
        );

        if (!res.ok) {
          throw new Error('Something went wrong with movies loading');
        }
        const data = await res.json();

        if (data.Response === 'False') {
          throw new Error(data.Error);
        }

        setError(null);
        setMovies(data.Search);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setError(null);
      return;
    }

    loadMoviesData();

    return () => {
      abortController.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
