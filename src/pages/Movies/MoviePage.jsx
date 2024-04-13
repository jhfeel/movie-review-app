import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import ReactPaginate from "react-paginate";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import "./MoviePage.style.css";

const sortList = [
  { sort: "popularity.desc", name: "by Popularity" },
  { sort: "vote_average.desc", name: "by Rating" },
  { sort: "primary_release_date.desc", name: "by Newest" },
];

const MoviePage = () => {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const [genreId, setGenreId] = useState(null);
  const keyword = query.get("q");
  const navigate = useNavigate();

  const { data: genreList } = useMovieGenreQuery();
  const genre = genreList?.find((item) => item.id === Number(genreId))?.name;
  const sortName = sortList?.find((item) => item.sort === sort)?.name;
  console.log("ggl", genreList, genre);

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1);
  };

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    sort,
    genreId,
    keyword,
    page,
  });

  if (isLoading) {
    return <Spinner animation="border" variant="danger" role="status" />;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div style={{ padding: "30px" }}>
      <Container>
        <Row>
          <Col className="dropdown-container">
            <Dropdown
              onSelect={(eventKey) => {
                navigate("/movies");
                setSort(eventKey);
              }}
            >
              <Dropdown.Toggle
                variant={sort ? "danger" : "outline-danger"}
                id="dropdown-basic"
              >
                {sort ? "Sort: " + sortName : "Sort"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey={"popularity.desc"}>
                  by Popularity
                </Dropdown.Item>
                <Dropdown.Item eventKey={"vote_average.desc"}>
                  by Rating
                </Dropdown.Item>
                <Dropdown.Item eventKey={"primary_release_date.desc"}>
                  by Newest
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
              onSelect={(eventKey) => {
                navigate("/movies");
                setGenreId(eventKey);
              }}
            >
              <Dropdown.Toggle
                variant={genreId ? "danger" : "outline-danger"}
                id="dropdown-basic"
              >
                {genreId ? "Genre: " + genre : "Genre"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {genreList?.map((item) => (
                  <Dropdown.Item key={item.id} eventKey={item.id}>
                    {item.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col lg={12} xs={12}>
            <Row>
              {data?.results.map((movie, index) => (
                <Col
                  key={index}
                  lg={3}
                  md={6}
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
            <div>
              <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={data?.total_pages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={page - 1}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MoviePage;
