import React from "react";
import Badge from "react-bootstrap/Badge";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import "./MovieCard.style.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const voteAverageFormatted = (
    Math.round(movie.vote_average * 10) / 10
  ).toFixed(1);

  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path})`,
      }}
      className="movie-card"
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <div className="overlay">
        <h4>{movie.title}</h4>
        <div className="movie-info">
          <div className="genre-list">
            {showGenre(movie.genre_ids)
              .map((genre) => (
                <Badge bg="danger" key={genre} className="genre">
                  {genre}
                </Badge>
              ))
              .slice(0, 3)}
          </div>
          <div>⭐{voteAverageFormatted}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
