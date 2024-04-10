import { fetchMovieDetails} from '../../services/api';
import { useParams, Link, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense, useRef } from 'react'
import Loader from '../../components/Loader/Loader';
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css"


  const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
  const MovieReviews = lazy(() => import("../../components/MovieReviews/MovieReviews"));


const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");



   useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, []);
  

  if (!movieDetails) {
   
    return <Loader />;
  }

  return (

    <div className={css.MovieDetails}>
      <Link to={backLinkRef.current}>⬅ Go Back</Link>
      <img src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`} alt={movieDetails.original_title} />
      <h1>{movieDetails.title}</h1>
      <h2>Overview</h2>
      <p>{movieDetails.overview}</p>
      <h2>Rate: {movieDetails.vote_average}</h2>
      <h2>Genres</h2>
      <ul>
        {movieDetails.genres.map(genre => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>
      <ul className={css.linkList}>
        <Link to={`/movies/${movieId}/cast`} >Cast</Link> 
        <Link to={`/movies/${movieId}/reviews`} >Reviews</Link>
      </ul>
    

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} /> 
        </Routes>
      </Suspense>

    </div>


  );
};

export default MovieDetailsPage;