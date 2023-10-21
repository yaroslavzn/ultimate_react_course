import { useState } from 'react';
import NavBar from './components/NavBar';
import Main from './components/Main';
import { tempMovieData, tempWatchedData } from './data/data';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import MoviesBox from './components/MoviesBox';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import WatchedMovieList from './components/WatchedMovieList';

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />

        <SearchBar />

        <SearchResult searchCount={movies.length} />
      </NavBar>

      <Main>
        <MoviesBox>
          <MovieList movies={movies} />
        </MoviesBox>

        <MoviesBox>
          <WatchedSummary watched={watched} />

          <WatchedMovieList watched={watched} />
        </MoviesBox>
      </Main>
    </>
  );
}

export default App;
