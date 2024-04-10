import { Link } from "react-router-dom"

function MovieList({ movies, state}) {
  return (
    <ul>
      {movies.map(movie => <li key={movie.id}> <Link to={`/movies/${movie.id}`} state={state} >{movie.title} </Link> </li>)}
    </ul>
  )
}

export default MovieList