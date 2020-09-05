import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./main-view.scss";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      newUser: null
    };
  }

  componentDidMount() {
    axios.get('https://faveflix-api.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }


  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  registerUser() {
    this.setState({
      newUser: true,
    })
  }

  userRegistered() {
    this.setState({
      newUser: null,
    })
  }

  render() {

    const { movies, selectedMovie, user, newUser } = this.state;

    if (!user) {
      if (newUser) return (
        <RegistrationView
          userRegistered={() => this.userRegistered()}
          onLoggedIn={user => this.onLoggedIn(user)}
        />
      );

      else return (
        <LoginView
          onLoggedIn={user => this.onLoggedIn(user)}
          newUser={() => this.registerUser()}
        />
      );
    }


    if (!movies) return <div className="main-view" />;

    return (

      <div className="main-view">
        <Container className="main-view-container">
          <Row>

            {selectedMovie
              ? <MovieView movie={selectedMovie} />
              : movies.map(movie => (
                <Col key={movie._id} xs={8} sm={8} md={6} lg={4}>
                  <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                </Col>
              ))
            }
          </Row>

        </Container>

      </div>
    );
  }
}

MainView.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }),
  selectedMovie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  })
}
