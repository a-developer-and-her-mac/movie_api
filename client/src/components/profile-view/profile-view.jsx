import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import axios from "axios";
import CardGroup from "react-bootstrap/CardGroup";

import { Link } from "react-router-dom";

export class ProfileView extends React.Component {
  constructor(props) {
    super();

    this.state = {
      movies: [],
      user: null,
      username: null,
      password: null,
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
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");


    axios.put(`https://faveflix-api.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },

      Username: username,
      Password: this.password,
      Email: this.email,
      Birthday: this.birthday,
    })
      .then(response => {
        const data = response.data;
        localStorage.setItem("user", data.Username);
        window.open("/", "_self");
      })
      .catch(e => {
        console.log(e)
      });
  };


  handleDeregistration = (e) => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios.delete(`https://faveflix-api.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },

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

    this.setState({
      user: null,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  eventTarget = (value) => {
    this.setState({ value: event.target.value })
  }


  render() {

    const { movies } = this.props;
    return (
      <div className="profile-view">
        <Container className="profile-view-container">
          <CardGroup>
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
                  Birthday: {this.state.Birthday}
                </Card.Text>
                <Card.Text>
                  Favorite Movies: {this.state.FavoriteMovies}
                </Card.Text>
                <Button className="button-delete" onClick={() => this.handleDeregistration()}>
                  Delete Account
              </Button>

              </Card.Body>
            </Card>
            <Card className="edit-profile-card">
              <Card.Header as="h5">Edit Profile</Card.Header>
              <Card.Body>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label className="username-label">Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" value={this.username} onChange={e => this.eventTarget()} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="password-label">Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={this.password} onChange={e => this.eventTarget()} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="email-label">Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={this.email} onChange={e => this.eventTarget()} />

                </Form.Group>

                <Form.Group controlId="formBasicBirthday">
                  <Form.Label className="birthday-label">Birthdate</Form.Label>
                  <Form.Control type="date" placeholder="Birthday" value={this.birthday} onChange={e => this.eventTarget()} />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button className="button-update" onClick={() => this.handleUpdate()}>
                  Update
                </Button>
              </Card.Body>
            </Card>
          </CardGroup>
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
