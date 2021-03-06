import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

import { Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {
      favoriteMovies: [],
    };
  }
  /**
   * adds a movie to favorites
   * @function addToFavoriteMovies
   * @param {*} movie 
   * @param {*} token
   */
  addToFavoriteMovies(movie) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.post(`https://faveflix-api.herokuapp.com/users/${username}/Movies/${movie}`, {

      FavoriteMovies: this.FavoriteMovies,
    },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(response => {
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    alert("movie successfully added.")
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
              <Link to={`/Directors/${movie.Director.Name}`}>
                <Button className="button-director" >
                  Director
                </Button>
              </Link>
              <Link to={`/`}>
                <Button className=" button-goBack">Back</Button>
              </Link>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button className="button-genre">
                  Genre
                </Button>
              </Link>
              <Button className="button-favorite" onClick={() => this.addToFavoriteMovies(movie._id)}>
                Add to Favorites
              </Button>
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
  })
}