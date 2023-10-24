import { useEffect, useState } from 'react';
import { API_KEY } from '../constants/constants';
import Loader from './Loader';
import StarRating from './StarRating';
import { useKey } from '../hooks/useKey';

export default function MovieDetails({ movieId, onBack, onMarkWatched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
      );
      const data = await res.json();

      setMovie(data);
      setIsLoading(false);
    }

    fetchMovieDetails();
  }, [movieId]);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    if (!title) {
      return;
    }

    document.title = `Movie | ${title}`;
  }, [title]);

  useEffect(() => {
    return () => {
      document.title = 'usePopcorn';
    };
  }, []);

  useKey('Escape', () => onBack(null));

  function onAddToWatchedHandler() {
    const watchedMovie = {
      imdbID: movie.imdbID,
      userRating,
      runtime: parseInt(runtime),
      poster,
      title,
      imdbRating,
    };

    onMarkWatched(watchedMovie);
    onBack(null);
  }

  return (
    <div className="details">
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <header>
            <button className="btn-back" onClick={() => onBack(null)}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />

              {userRating && (
                <button className="btn-add" onClick={onAddToWatchedHandler}>
                  + Add to list
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
