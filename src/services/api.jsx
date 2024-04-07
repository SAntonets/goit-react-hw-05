import axios from "axios";

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDUxNDI2OWM3N2RjMDg5M2YyZWQwMGZiMGZjZTA1ZSIsInN1YiI6IjY2MTFhNDNlZDc2OGZlMDE3YjQyOTBhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6dz6uJrpe7BEOIb1AlP91mv2yThFPDZXaNazq-1RI-U'

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_KEY}`
  }
});

export async function fetchPopularMovies() {
  try {
    const response = await instance.get("/movie/popular");
    return response.data.results; 
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return []; 
  }
}

export async function searchMovie(query) {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          query: query,
          include_adult: false,
          language: 'en-US',
          page: 1
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
}


export async function fetchMovieDetails(movieId)  {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          language: 'en-US'
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
}


export async function fetchMovieCredits(movieId)  {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        params: {
          language: 'en-US'
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      });
      return response.data.cast;
    } catch (error) {
      console.error('Error fetching movie credits:', error);
      return [];
    }
}
    
export async function fetchMovieReviews(movieId) {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        params: {
          language: 'en-US',
          page: 1
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movie reviews:', error);
      return [];
    }
}
