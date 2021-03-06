import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { connect } from "react-redux";
import { setMovies } from "../../actions/actions";

import "./main-view.scss";

import MoviesList from "../movies-list/movies-list";
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
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }
  /**
   * gets the movies from the database
   * @function getMovies
   * @param {*} token 
   * @return {movies}
   */
  getMovies(token) {
    axios
      .get("https://faveflix-api.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /**
   * on logged in, sets localstorage items like token and user
   * @function onLoggedIn
   * @param {*} authData 
   */
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }
  /**
   * on log out, removes local storage items like token and user
   * @function logOutHandler
   */
  logOutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  render() {
    const { movies } = this.props;
    const { user } = this.state;

    if (!movies) return <div className="main-view" />;

    return (
      <Router basename="/client">
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
              <Button
                className="button-logout"
                onClick={() => this.logOutHandler()}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="main-view">
          <Container className="main-view-container">
            <Row>
              <Route
                exact
                path="/"
                render={() => {
                  if (!user)
                    return (
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    );
                  return <MoviesList movies={movies} />;
                }}
              />
            </Row>
          </Container>

          <Route
            path="/movies/:movieId"
            render={({ match }) => (
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
              />
            )}
          />

          <Route
            path="/directors/:name"
            render={({ match }) => {
              if (!movies) return <div className="main-view" />;
              return (
                <DirectorView
                  director={movies.find(
                    (m) => m.Director.Name === match.params.name
                  )}
                  movies={movies}
                />
              );
            }}
          />

          <Route
            path="/genres/:name"
            render={({ match }) => (
              <GenreView
                genre={movies.find((m) => m.Genre.Name === match.params.name)}
                movies={movies}
              />
            )}
          />

          <Route path="/register" render={() => <RegistrationView />} />

          <Route path="/login" render={() => <LoginView />} />

          <Route path="/users" render={() => <ProfileView movies={movies} />} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    })
  ),
};
