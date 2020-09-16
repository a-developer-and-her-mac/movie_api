import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";
import { MovieView } from "../movie-view/movie-view";

import "./genre-view.scss";

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    return (
      <div className="genre-view">
        <Container className="genre-view-container">
          <Card style={{ width: '25rem' }}>
            <Card.Body>

              <Card.Title> {genre.Name} </Card.Title>
              <Card.Text> {genre.Description} </Card.Text>


              <Link to={`/`}>
                <Button className="button-genre">Back</Button>
              </Link>

            </Card.Body>
          </Card>

        </Container>
      </div>
    )
  }
}
