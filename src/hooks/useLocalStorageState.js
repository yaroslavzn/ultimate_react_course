import { useEffect, useState } from 'react';

export function useLocalStorageState(initialState, key) {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem(key);

    if (!storedData) {
      return initialState;
    }

    return JSON.parse(storedData);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
}
