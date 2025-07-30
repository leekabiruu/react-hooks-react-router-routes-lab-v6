import { Link } from 'react-router-dom';

function MovieCard({ movie, title }) {
  return (
    <article>
      <h2>{title}</h2>
      <Link to={`/movie/${movie.id}`}>View Info</Link>
    </article>
  );
}

export default MovieCard;