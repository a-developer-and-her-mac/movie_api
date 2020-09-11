import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

import { Link } from "react-router-dom";

export function ProfileView(props) {
  const [user, setUser] = useState(user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");


  const handleUpdate = (e) => {
    e.preventDefault();
    axios.post("https://faveflix-api.herokuapp.com/users/:Username", {
      Username: username,
      Password: password,
      Email: email,
      Birthdate: birthdate
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

  const handleDeregistration = (e) => {
    e.preventDefault();
    axios.delete("https://faveflix-api.herokuapp.com/users/:Username", {
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


  return (
    <Container className="profile-container">
      <Row>
        <Col>
        </Col>
      </Row>
    </Container>
  )
}


ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.date
  })
};