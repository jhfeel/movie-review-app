import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";
import Spinner from "react-bootstrap/Spinner";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const mostPopularMovie = data?.results[8];

  if (isLoading) {
    return <Spinner animation="border" variant="danger" role="status" />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${mostPopularMovie.poster_path})`,
      }}
      className="banner"
    >
      <div className="text-white banner-text-area">
        <h1>{mostPopularMovie.title}</h1>
        <p className="banner-overview">{mostPopularMovie.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
