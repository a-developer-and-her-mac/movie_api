import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { LoginView } from "../login-view/login-view";
import "./registration-view.scss";

export function RegistrationView(props) {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* Then call props..onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container className="registration-view-container">
      <Row>
        <Col xs={12} sm={12} className="Col">
          <Form>

            <Form.Group controlId="formBasicUsername">
              <Form.Label className="username-label">Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUserName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="password-label">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label className="email-label">Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
    </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button className="button-register" type="submit" onClick={handleSubmit}>
              Register
  </Button>
            <p> Already registered? Click {' '}
              <span className="span-register" type="text" onClick={() => props.userRegistered()}>
                here
  </span>{' '}
  to login.
        </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  })
};