import { useState } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import MoviesBox from './components/MoviesBox';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import WatchedMovieList from './components/WatchedMovieList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import MovieDetails from './components/MovieDetails';
import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';

function App() {
  const [watched, setWatched] = useLocalStorageState([], 'watched');
  const [query, setQuery] = useState('dark knight');
  const { movies, isLoading, error } = useMovies(query, () =>
    toggleSelectedMovieHandler(null)
  );
  const [selectedId, setSelectedId] = useState(null);

  function toggleSelectedMovieHandler(id) {
    if (!id || id === selectedId) {
      return setSelectedId(null);
    }

    setSelectedId(id);
  }

  function markMovieAsWatchedHandler(movie) {
    setWatched((movies) => [...movies, movie]);
  }

  function removeFromWatchedHandler(id) {
    setWatched((watched) => watched.filter((item) => item.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />

        <SearchBar query={query} setQuery={setQuery} />

        <SearchResult searchCount={movies.length} />
      </NavBar>

      <Main>
        <MoviesBox>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onMovieSelect={toggleSelectedMovieHandler}
            />
          )}
        </MoviesBox>

        <MoviesBox>
          {selectedId ? (
            <MovieDetails
              movieId={selectedId}
              onBack={toggleSelectedMovieHandler}
              onMarkWatched={markMovieAsWatchedHandler}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />

              <WatchedMovieList
                watched={watched}
                onRemoveFromWatched={removeFromWatchedHandler}
              />
            </>
          )}
        </MoviesBox>
      </Main>
    </>
  );
}

export default App;
