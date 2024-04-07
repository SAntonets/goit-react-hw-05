import axios from "axios";

const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';


const options = {
 headers: {
 Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDUxNDI2OWM3N2RjMDg5M2YyZWQwMGZiMGZjZTA1ZSIsInN1YiI6IjY2MTFhNDNlZDc2OGZlMDE3YjQyOTBhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6dz6uJrpe7BEOIb1AlP91mv2yThFPDZXaNazq-1RI-U'
 }
};
 export async function RequestPopularMovies(url, options) {
      const response = await axios.get(url, options
      );
			console.log(response);
}
    
RequestPopularMovies(url, options);


