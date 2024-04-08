import React from "react";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const mostPopularMovie = data?.results[0];

  if (isLoading) {
    return <Spinner animation="border" variant="danger" role="status" />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/${mostPopularMovie.backdrop_path})`,
      }}
      className="banner"
    >
      <div className="text-white banner-text-area">
        <h1 className="banner-title">{mostPopularMovie.title}</h1>
        <p className="banner-overview">{mostPopularMovie.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
