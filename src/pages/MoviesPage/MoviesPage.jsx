import { searchMovie } from '../../services/api';
import { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';

function MoviesPage() {
    const [inputValue, setInputValue] = useState('');
    const [foundMovies, setFoundMovies] = useState([]);
    const [searchError, setSearchError] = useState('');

    useEffect(() => {
        const query = localStorage.getItem('searchQuery');
        if (query) {
            setInputValue(query);
            handleSearch(query);
        }
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSearch = async (query) => {
        try {
            const data = await searchMovie(query);
            if (data.length === 0) {
                setSearchError('No movies found with this title.');
            } else {
                setSearchError('');
                setFoundMovies(data);
            }
            localStorage.setItem('searchQuery', query);
        } catch (error) {
            console.error("Error searching movies:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(inputValue);
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
        <MovieList movies={foundMovies} state={'/movies'} />
        </div>
    );
}

export default MoviesPage;
