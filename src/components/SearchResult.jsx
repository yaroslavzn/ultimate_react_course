export default function SearchResult({ searchCount }) {
  return (
    <p className="num-results">
      Found <strong>{searchCount}</strong> results
    </p>
  );
}
