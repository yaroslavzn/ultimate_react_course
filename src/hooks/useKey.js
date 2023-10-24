import { useEffect } from 'react';

export function useKey(keyCode, action) {
  useEffect(() => {
    const handler = (event) => {
      if (event.code.toLowerCase() === keyCode.toLowerCase()) {
        action();
      }
    };
    document.addEventListener('keydown', handler);

    return () => document.removeEventListener('keydown', handler);
  }, [keyCode, action]);
}
