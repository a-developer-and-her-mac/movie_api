import React from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

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
    <Row>
      <VisibilityFilterInput visibilityFilter={visibilityFilter}
      />
      {filteredMovies.map(m => (
        <Col key={m._id} xs={8} sm={8} md={6} lg={4}>
          <MovieCard key={m._id} movie={m} />
        </Col>
      ))}
    </Row>
  </div>;

}

export default connect(mapStateToProps)(MoviesList);