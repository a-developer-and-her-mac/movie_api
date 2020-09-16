import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";



import "./director-view.scss";
import { MovieView } from "../movie-view/movie-view";
import { MainView } from "../main-view/main-view";

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }



  render() {
    const { director } = this.props;

    if (!director) return null;

    return (
      <div className="director-view">
        <Container className="director-view-container">
          <Card style={{ width: '25rem' }}>
            <Card.Body>
              <Card.Title> {director.Name} </Card.Title>
              <Card.Text> {director.Bio} </Card.Text>
              <Card.Text> {director.Birth} </Card.Text>
              <Card.Text> {director.Death} </Card.Text>

              <Link to={`/`}>
                <Button className="director-button">Back</Button>
              </Link>

            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }
}
