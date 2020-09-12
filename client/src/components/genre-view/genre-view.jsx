import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import { MovieView } from "../movie-view/movie-view";

import "./genre-view.scss";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: []
    }
  }

  render() {
    return (
      <div className="genre-view">
        <Container>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Back</Button>
          </Link>
        </Container>
      </div>
    )
  }
}
