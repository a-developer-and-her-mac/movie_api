import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
      <Container className="movie-view-container">
        <Row>
          <Col>
            <div className="movie-view">
              <img className="movie-poster" src={movie.ImagePath} />
              <div className="movie-title text-center h2 font-weight-bold">
                <span className="label font-italic">Title: </span>
                <span className="value">{movie.Title}</span>
              </div>
              <div className="movie-description text-justify">
                <span className="label font-italic">Description: </span>
                <span className="value"> {movie.Description}</span>
              </div>

              <div className="movie-genre  text-justify">
                <span className="label font-italic"> Genre: </span>
                <span className="value">{movie.Genre.Name}</span>
              </div>
              <div className="movie-director text-justify">
                <span className="label font-italic">Director: </span>
                <span className="value">{movie.Director.Name}</span>
              </div>
              <Button type="button" className=" button-goBack" onClick={this.goBack}>Go Back</Button>
            </div>
          </Col>
        </Row>
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