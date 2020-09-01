import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";




import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (

      <Container className="movie-card-container">
        <Row>
          <Col>
            <Card className="Card">
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title className="font-weight-bold">{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Button onClick={() => onClick(movie)} variant="link">Open</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container >
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};