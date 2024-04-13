import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useMovieCreditsQuery,
  useMovieDetailsQuery,
} from "../../hooks/useMovieDetails";
import { useMovieRecommendationsQuery } from "../../hooks/useMovieRecommendations";
import MovieCard from "./../../common/MovieCard/MovieCard";
import { useMovieReviewsQuery } from "./../../hooks/useMovieReviews";
import "./MovieDetailPage.style.css";
import MovieReview from "./components/MovieReview/MovieReview";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useMovieVideoQuery } from "../../hooks/useMovieVideo";
import YouTube from "react-youtube";
import { Alert, Badge, Col, Container, Row, Spinner } from "react-bootstrap";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("Reviews");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const youtubeOpts = {
    height: "300px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const { data, isLoading, isError, error } = useMovieDetailsQuery({
    movie_id: id,
  });
  console.log("ddd", data);
  const { data: credits } = useMovieCreditsQuery({ movie_id: id });
  const { data: reviews } = useMovieReviewsQuery({ movie_id: id });
  const { data: recommendations } = useMovieRecommendationsQuery({
    movie_id: id,
  });
  const { data: trailer } = useMovieVideoQuery({ movie_id: id });
  console.log("tt", trailer);
  const directorList = credits?.crew.filter(
    (person) => person.job === "Director"
  );
  const mainActorList = credits?.cast.slice(0, 4);

  const voteAverageFormatted = (
    Math.round(data?.vote_average * 10) / 10
  ).toFixed(1);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      maximumFractionDigits: 2,
    }).format(value);
  };

  if (isLoading) {
    return <Spinner animation="border" variant="danger" role="status" />;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col lg={4} md={4} xs={12} className="movie-info-left">
          <div
            style={{
              backgroundImage: `url(https://media.themoviedb.org/t/p/w440_and_h660_face/${data?.poster_path})`,
            }}
            className="movie-detail-poster"
          />
          <Button
            variant="outline-danger"
            onClick={handleShow}
            className="trailer-button"
          >
            Trailer
          </Button>
        </Col>
        <Col lg={7} md={7} xs={12} className="movie-info-right">
          <h2 className="movie-title">
            {data?.title} ({data?.release_date.slice(0, 4)})
          </h2>
          <div className="genre-list">
            {data?.genres.map((item) => (
              <Badge key={item.id} bg="danger" className="genre">
                {item.name}
              </Badge>
            ))}
          </div>
          <div>
            <Badge bg="secondary" className="badge-title">
              ⌛ Runtime
            </Badge>
            {"  "}
            {Math.floor(data?.runtime / 60)}:{data?.runtime % 60}
          </div>
          <div>
            <Badge bg="secondary" className="badge-title">
              ⭐ Rating
            </Badge>
            {"  "}
            {voteAverageFormatted}
          </div>
          <div>
            <Badge bg="secondary" className="badge-title">
              💰 Budget
            </Badge>
            {"  "}${formatCurrency(data?.budget)}
          </div>
          <div>
            <Badge bg="secondary" className="badge-title">
              💸 Revenue
            </Badge>
            {"  "}${formatCurrency(data?.revenue)}
          </div>
          <div className="overview-box">{data?.overview}</div>
        </Col>
      </Row>
      <Row className="profile-list">
        {directorList?.map((director) => (
          <Col lg={2} md={2} xs={3} className="profile">
            <div
              key={director.id}
              style={{
                backgroundImage: `url(https://media.themoviedb.org/t/p/w276_and_h350_face/${director.profile_path})`,
              }}
              className="profile-image"
            />
            <div className="person-name">{director.name}</div>
            <div className="role-name">{director.job}</div>
          </Col>
        ))}
        {mainActorList?.map((actor) => (
          <Col lg={2} md={2} xs={3} className="profile">
            <div
              key={actor.id}
              style={{
                backgroundImage: `url(https://media.themoviedb.org/t/p/w276_and_h350_face/${actor.profile_path})`,
              }}
              className="profile-image"
            />
            <div className="person-name">{actor.name}</div>
            <div className="role-name">{actor.character}</div>
          </Col>
        ))}
      </Row>
      <div className="toggle-button-container">
        <Button
          variant={currentComponent === "Reviews" ? "danger" : "outline-danger"}
          onClick={() => setCurrentComponent("Reviews")}
        >
          Reviews
        </Button>
        <Button
          variant={
            currentComponent === "Recommendations" ? "danger" : "outline-danger"
          }
          onClick={() => setCurrentComponent("Recommendations")}
        >
          Recommendations
        </Button>
      </div>
      <Row className="components-box">
        {currentComponent === "Reviews" ? (
          <Col lg={12} md={12} xs={12}>
            {reviews?.map((review) => (
              <MovieReview key={review.id} review={review} />
            ))}
          </Col>
        ) : (
          recommendations?.map((movie) => (
            <Col lg={3} md={6} xs={6} className="movie-card-box">
              <MovieCard key={movie.id} movie={movie} />
            </Col>
          ))
        )}
      </Row>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          data-bs-theme="dark"
        >
          <Modal.Header closeButton>
            <Modal.Title>{data?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <YouTube videoId={trailer?.key} opts={youtubeOpts} />
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
};

export default MovieDetailPage;
