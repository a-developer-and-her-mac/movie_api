import React from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

import "./movies-list.scss";

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <Container className="movies-list-container">
      <Row>
        <VisibilityFilterInput visibilityFilter={visibilityFilter}
        />
        {filteredMovies.map(m => (
          <Col key={m._id} className="movie-col">
            <MovieCard key={m._id} movie={m} />
          </Col>
        ))}
      </Row>
    </Container>
  </div>;

}

export default connect(mapStateToProps)(MoviesList);