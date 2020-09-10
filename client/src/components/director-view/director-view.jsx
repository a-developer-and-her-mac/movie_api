import React, { useState } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./director-view.scss";

export function DirectorView(props) {

  return (
    <Container className="director-container">
      <Row>
        <Col>
          <h2>{movie.Director.Name}</h2>
          <div className="director-info">
            <p>
              {movie.Director.Bio}
            </p>
            <p>
              {movie.Director.Birth}
            </p>

          </div>

        </Col>
      </Row>
    </Container >
  );
}
