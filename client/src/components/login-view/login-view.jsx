import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import "./login-view.scss";
import { RegistrationView } from "../registration-view/registration-view";

export function LoginView(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* Then call props..onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleRegister = (e) => {
    e.preventDefault();

  }

  return (
    <Container className="form-container">
      <Row>
        <Col xs={1} sm={3} md={5} lg={8}>
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="username-label">Username</Form.Label>
              <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUserName(e.target.value)} />
            </Form.Group>


            <Form.Group controlId="formBasicPassword">
              <Form.Label className="password-label">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button className="button-login" type="button" onClick={handleSubmit}>
              Login
        </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  })
};