import { fetchPopularMovies, searchMovie, fetchMovieDetails, fetchMovieCredits, fetchMovieReviews } from '../../services/api';
import { NavLink, Route, Routes } from "react-router-dom";
 







const HomePage = ({ movies }) => {
  return <>
    <h1>Trending today</h1>
    <ul>
      {movies.map(movie => <li key={movie.id}> <NavLink to={`/movies/${movie.id}`}>{movie.title}</NavLink> </li>)}
    </ul>
  </>
};

export default HomePage;