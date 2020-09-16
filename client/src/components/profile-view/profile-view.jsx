import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import axios from "axios";

import { Link } from "react-router-dom";

export class ProfileView extends React.Component {
  constructor(props) {
    super();

    this.state = {
      movies: [],
      user: null,
      username: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem("user");

    axios.get(`https://faveflix-api.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://faveflix-api.herokuapp.com/users/${username}`, {
      Username: username,
      Password: password,
      Email: email,
      birthday: birthday,
      FavoriteMovies: favoriteMovies
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch(e => {
        console.log("error updating user")
      });
  };


  handleDeregistration = (e) => {
    e.preventDefault();
    axios.delete(`https://faveflix-api.herokuapp.com/users/${username}`, {
      Username: username
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch(e => {
        console.log("error deregistering user")
      });
  }


  render() {

    const { movies } = this.props;
    return (
      <div className="profile-view">
        <Container className="profile-view-container">
          <Card className="profile-card">
            <Card.Header as="h5">{this.state.Username}</Card.Header>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Card.Text>
                Username: {this.state.Username}
              </Card.Text>
              <Card.Text>
                Password: *******
            </Card.Text>
              <Card.Text>
                Email: {this.state.Email}
              </Card.Text>
              <Card.Text>
                Favorite Movies: {this.state.FavoriteMovies}
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }
}




ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.date,
    FavoriteMovies: PropTypes.array
  })
};
