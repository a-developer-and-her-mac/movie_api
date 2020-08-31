import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <Container>
        <div onClick={() => onClick(movie)} className="movie-card" >{movie.Title}</div>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};