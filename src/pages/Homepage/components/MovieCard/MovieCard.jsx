import React, { useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  const voteAverageFormatted = (
    Math.round(movie.vote_average * 10) / 10
  ).toFixed(1);

  useEffect(() => {
    console.log(movie);
  });
  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${movie.backdrop_path})`,
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h4>{movie.title}</h4>
        <div className="movie-info">
          <div className="genre-list">
            {movie.genre_ids
              .map((id) => <Badge bg="danger">{id}</Badge>)
              .slice(0, 3)}
          </div>
          <div>⭐{voteAverageFormatted}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
