import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
        <Container>
          <Row>
            <Col>
              <h1>{this.state.username}</h1>
              <p>{this.state.username}</p>
              <p>{this.state.password}</p>
              <p>{this.state.email}</p>
              <p>{this.state.birthday}</p>
              <p>{this.state.favoriteMovies}</p>
            </Col>
          </Row>
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
