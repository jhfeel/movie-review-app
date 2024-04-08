import React, { useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
  const voteAverageFormatted = (
    Math.round(movie.vote_average * 10) / 10
  ).toFixed(1);
  const { data: genreData } = useMovieGenreQuery();
  console.log(genreData, "genreData");
  console.log(movie.genre_ids, "genrid");
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
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${movie.backdrop_path})`,
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h4>{movie.title}</h4>
        <div className="movie-info">
          <div className="genre-list">
            {showGenre(movie.genre_ids)
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
