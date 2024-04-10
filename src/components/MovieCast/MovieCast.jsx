import { fetchMovieCredits } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import clsx from "clsx";
const MovieCast = () => {
    const { movieId } = useParams();
    const [movieCredits, setMovieCredits] = useState(null);

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const data = await fetchMovieCredits(movieId);
                setMovieCredits(data);
            } catch (error) {
                console.error("Error fetching movie credits:", error);
            }
        };

        fetchCredits();
    }, [movieId]);

    

    if (!movieCredits) {
        return <Loader />;
    }

    if (movieCredits.length === 0) {
    return <p>We don&#39;t have any casts for this movie.</p>;
}

    return (
        <div>
            <ul>
                {movieCredits.map(actor => (
                    <li key={actor.cast_id}>
                        <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} height={100} />
                        <h3>{actor.name}</h3>
                        <p>Character: {actor.character}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieCast;
