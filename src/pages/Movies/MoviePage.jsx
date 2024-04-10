import React from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword });
  console.log("dad", data);

  if (isLoading) {
    return <Spinner animation="border" variant="danger" role="status" />;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <Container>
        <Row>
          <Col lg={12} xs={12}>
            <Row>
              {data?.map((movie, index) => (
                <Col key={index} lg={4} md={6} xs={6}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MoviePage;
