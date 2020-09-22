import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


import "./main-view.scss";

import { ProfileView } from "../profile-view/profile-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      newUser: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://faveflix-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
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


  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
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

  logOutHandler() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    })
    window.open('/', '_self');
  }



  render() {

    const { movies, selectedMovie, user, newUser } = this.state;

    if (!movies) return <div className="main-view" />;

    return (

      <Router>
        <Navbar className="nav-bar" bg="light" expand="lg">
          <Navbar.Brand>
            <Link to="/" className="home-link">
              Fave-Flix
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Link to={`/users`}>
                <Button variant="link" className="button-profile">
                  Account
                </Button>
              </Link>
              <Button className="button-logout" onClick={() => this.logOutHandler()}>
                Logout
            </Button>
            </Nav>

          </Navbar.Collapse>
        </Navbar>
        <div className="main-view">
          <Container className="main-view-container">
            <Row>
              <Route exact path="/" render={() => {
                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                return movies.map(m => (
                  <Col key={m._id} xs={8} sm={8} md={6} lg={4}>
                    <MovieCard key={m._id} movie={m} />
                  </Col>
                )
                )
              }
              } />
            </Row>
          </Container>

          <Route path="/movies/:movieId" render={({ match }) =>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name)} movies={movies} />
          }
          } />


          <Route path="/genres/:name" render={({ match }) =>
            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name)} movies={movies} />} />


          <Route path="/register" render={() => <RegistrationView />} />

          <Route path="/login" render={() => <LoginView />} />

          <Route path="/users" render={() => <ProfileView movies={movies} />} />

        </div>
      </Router >
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
