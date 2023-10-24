import { useRef } from 'react';
import { useKey } from '../hooks/useKey';

export default function SearchBar({ query, setQuery }) {
  const inputRef = useRef();

  useKey('Enter', () => {
    if (document.activeElement !== inputRef.current) {
      setQuery('');
    }

    inputRef.current.focus();
  });

  return (
    <input
      ref={inputRef}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
