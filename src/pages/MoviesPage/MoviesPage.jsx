import { searchMovie } from '../../services/api';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams, useLocation } from 'react-router-dom';


function MoviesPage() {
    const [inputValue, setInputValue] = useState('');
    const [foundMovies, setFoundMovies] = useState([]);
    const [searchError, setSearchError] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";
    const location = useLocation();

    useEffect(() => {
        if (query) {
            searchMovie(query).then((data) => {
                setFoundMovies(data);
            });
        }
    }, [query]);

    const updateQueryString = (query) => {
        const nextParams = query !== "" ? { query } : {};
        setSearchParams(nextParams);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const data = await searchMovie(inputValue);
            if (data.length === 0) {
                setSearchError('No movies found with this title.');
            } else {
                setSearchError('');
                setFoundMovies(data);
            }
        } catch (error) {
            console.error("Error searching movies:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch();
        updateQueryString(inputValue);
    };



    if (!foundMovies) {
   
    return <Loader />;
  }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>
            {searchError && <p>{searchError}</p>}
            <MovieList movies={foundMovies} state={location.state} />
        </div>
    );
}

export default MoviesPage;
