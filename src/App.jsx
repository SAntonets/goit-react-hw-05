import { useEffect, useState, lazy, Suspense} from 'react'
import { NavLink, Route, Routes } from "react-router-dom";
 
import { fetchPopularMovies, searchMovie, fetchMovieDetails, fetchMovieCredits, fetchMovieReviews } from './services/api';
import Loader from "./components/Loader/Loader";
function App() {

  const [movies, setMovies] = useState(null);
  const [movie, setMovie] = useState(null);
  
  const [movieCredits, setMovieCredits] = useState(null);
  const [movieReviews, setMovieReviews] = useState(null);
  const [query, setQuery] = useState('Thor');

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const NotFound = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));



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

  

  return (
   <div>
      <header>
        <nav>
          <NavLink to="/">
            HomePage
          </NavLink>
          <NavLink to="/movies">
            MoviesPage
          </NavLink>
        </nav>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage movies={movies } />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage movie={movie} setMovie={setMovie } />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
