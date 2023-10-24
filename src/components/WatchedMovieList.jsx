export default function WatchedMovieList({ watched, onRemoveFromWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          onRemoveFromWatched={onRemoveFromWatched}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, onRemoveFromWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onRemoveFromWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
