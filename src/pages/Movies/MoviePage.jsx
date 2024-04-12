import React, { useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import "./MoviePage.style.css";
import Dropdown from "react-bootstrap/Dropdown";

const MoviePage = () => {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get("q");

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1);
  };

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
          <Dropdown onSelect={() => {}}>
            <Dropdown.Toggle variant="danger" id="dropdown-basic">
              정렬
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>인기순</Dropdown.Item>
              <Dropdown.Item>평점순</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Row>
        <Row>
          <Col lg={12} xs={12}>
            <Row>
              {data?.results.map((movie, index) => (
                <Col
                  key={index}
                  lg={4}
                  md={6}
                  xs={6}
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
