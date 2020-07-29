const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/faveFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// List of top ten movies
let topTenMovies = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

app.use(morgan("common"));

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to faveFlix!");
});

app.get("/movies/top", (req, res) => {
  res.json(topTenMovies);
});

//Get a list of data about all movies

app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Get data about a single movie, by title

app.get("/movies/:Title", (req, res) => {
  Movies.findOne({
    Title: req.params.Title,
  })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get data about a genre by title

app.get("/movies/:Title/genre", (req, res) => {
  Movies.findOne({
    Title: req.params.Title,
  })
    .then((movie) => {
      res.status(201).json(movie.Genre.Name + " : " + movie.Genre.Description);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Get data about a director by name

app.get("/movies/Director/:Name", (req, res) => {
  Movies.findOne({
    "Director.Name": req.params.Name,
  })
    .then((movies) => {
      res.json(movies.Director.Name + ": " + movies.Director.Bio);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// Post new users

app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});
// Update user info

app.put("/users/:Username/info", (req, res) => {
  Users.findOneAndUpdate(
    {
      Username: req.params.Username,
    },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    {
      new: true,
    },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Add users list of favorite movies

app.post("/users/:Username/favorites", (req, res) => {
  Users.findOneAndUpdate(
    {
      Username: req.params.Username,
    },
    {
      $push: {
        FavoriteMovies: req.params.MovieID,
      },
    },
    {
      new: true,
    },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

//Delete a movie from the users list of favorites

app.delete("/users/:Username/favorites", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieID },
    },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Deregister a user

app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({
    Username: req.params.Username,
  })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
