import React from "react";
import axios from "axios";

export class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    axios.get('https://faveflix-api.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }





  render() {

    const { movies } = this.state;

    if (!movies.length) {
      return (
        <div className="main-view">
          No Movies
        </div>
      );
    }

    return (
      <div className="main-view">
        {movies.map(movie => (
          <div className="movie-card" key={movie._id}>{movie.Title}</div>
        ))}
      </div>
    );
  }
}

