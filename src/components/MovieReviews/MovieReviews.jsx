import { fetchMovieReviews } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import clsx from "clsx";
const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);

    useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setMovieReviews(data);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    };

    fetchReviews();
  }, []);



 if (!movieReviews) {
    return <Loader />;
}

if (movieReviews.length === 0) {
    return <p>We don&#39;t have any reviews for this movie.</p>;
}

return (
    <div>
        <ul>
            {movieReviews.map(review => (
                <li key={review.id}>
                    <h3>{review.author}</h3>
                    <p>{review.content}</p>
                </li>
            ))}
        </ul>
    </div>
);

}

export default MovieReviews