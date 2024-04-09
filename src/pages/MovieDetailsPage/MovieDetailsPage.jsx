import { fetchMovieDetails, fetchMovieCredits, fetchMovieReviews } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense} from 'react'




const MovieDetailsPage = (movie, setMovie) => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

   useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, []);
  
  console.log(id)

  return (
    <div>
      <h2>Movie Details</h2>
      <p>Movie ID: {id}</p>
      {/* Додайте іншу інформацію про фільм */}
    </div>
  );
};

export default MovieDetailsPage;