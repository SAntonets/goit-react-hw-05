import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

function MovieList({ movies }) {

const location = useLocation();
console.log(location)  
  return (
    <ul>
      {movies.map(movie => <li key={movie.id}> <Link to={`/movies/${movie.id}`} state={location} >{movie.title} </Link> </li>)}
    </ul>
  )
}

export default MovieList