import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import "./movie-view.scss";

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  goBack = () => {
    window.open('/', '_self')
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Container>
        <div className="movie-view">
          <img className="movie-poster" src={movie.ImagePath} />
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value"> {movie.Description}</span>
          </div>

          <div className="movie-genre">
            <span className="label"> Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
          </div>
          <Button className="button" onClick={this.goBack}>Go Back</Button>
        </div>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.date,
      Death: PropTypes.date
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired
}