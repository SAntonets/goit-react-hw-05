import { fetchPopularMovies} from '../../services/api';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import clsx from "clsx";
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css'





const HomePage = () => {
  const [movies, setMovies] = useState(null);


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

  


  if (!movies) {
   
    return <Loader />;
  }
  return <div className={css.HomePage}>
    <h1>Trending today</h1>
    <MovieList movies={movies} state={'/' } />
  </div>
};

export default HomePage;