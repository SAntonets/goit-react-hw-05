import { useEffect, useState, lazy, Suspense, Routes, Route, NavLink} from 'react'
 
import { fetchPopularMovies, searchMovie, fetchMovieDetails, fetchMovieCredits, fetchMovieReviews } from './services/api';

function App() {
  const [movies, setMovies] = useState(null);
  const [movie, setMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [movieReviews, setMovieReviews] = useState(null);
  const [query, setQuery] = useState('Thor');

  const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));

const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        const data = await searchMovie(query);
        setMovie(data);
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    };

    searchMovies();
  }, [query]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails('10195');
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const data = await fetchMovieCredits('10195');
        setMovieCredits(data);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    fetchCredits();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchMovieReviews('10195');
        setMovieReviews(data);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  console.log(movie);

  return (
   <div>
      <header>
        <nav className={css.nav}>
          <NavLink className={getNavLinkClassName} to="/">
            HomePage
          </NavLink>
          <NavLink className={getNavLinkClassName} to="/movies">
            MoviesPage
          </NavLink>
        </nav>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
