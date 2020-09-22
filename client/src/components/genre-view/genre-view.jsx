import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

import { Link } from "react-router-dom";
import { MovieView } from "../movie-view/movie-view";
import { MainView } from "../main-view/main-view";

import "./genre-view.scss";

export class GenreView extends React.Component {
  constructor(props) {
    super();

    this.state = {};
  }

  render() {
    const { genre, movies } = this.props;

    return (
      <div className="genre-view">
        <Container className="genre-view-container">
          <CardGroup>
            <Card style={{ width: '25rem' }}>
              <Card.Body>
                <Card.Title>{genre.Genre.Name}</Card.Title>
                <Card.Text>{genre.Genre.Description}</Card.Text>

                <Link to={`/`}>
                  <Button className="button-genre">Back</Button>
                </Link>

              </Card.Body>
            </Card>
            <Card style={{ width: '25rem' }}>
              <Card.Body>
                <Card.Title>Movies in This Genre</Card.Title>
                {movies.map((movie) => {
                  if (movie.Genre.Name === genre.Genre.Name) {
                    return (<div key={movie._id}>
                      <Link to={`movies/${movie._id}`}>
                        <Button variant="link" className="button-movies">{movie.Title}</Button>
                      </Link>
                    </div>
                    )
                  }
                })}
              </Card.Body>
            </Card>
          </CardGroup>

        </Container>
      </div>
    )
  }
}
