const express = require('express'),
  morgan = require('morgan');
const app = express();

// List of top ten movies
let topTenMovies = [{},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {}
];

app.use(morgan('common'));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to faveFlix!');
});

app.get('/movies/top', (req, res) => {
  res.json(topTenMovies);
});


//Get a list of data about all movies

app.get('/movies', (req, res) => {
  res.send('Successfull GET request returning data on all movies.');
});

//Get data about a single movie, by title

app.get('/movies/:title', (req, res) => {
  res.send('Successfull GET request returning data about a single movie by name.');
});

// Get data about a genre by title

app.get('/movies/:title/genre', (req, res) => {
  res.send('Successfull GET request returning data about a genre by title.');
});

// Get data about a director by name

app.get('/movies/:director', (req, res) => {
  res.send('Successfull GET request returning data about a director by name.');
});

// Post new users

app.post('/users', (req, res) => {
  res.send('Successfull POST request adding a new user.');
});

// Update user info

app.put('/users/:name/info', (req, res) => {
  res.send('Successfull PUT request updating user info.');
});

// Add users list of favorite movies

app.post('/users/:name/favorites', (req, res) => {
  res.send('Successfull POST request to add list of users favorite movies.');
});

//Delete a movie from the users list of favorites

app.delete('/users/:name/favorites', (req, res) => {
  res.send('Successfull DELETE request removing a movie from the users list of favorites.');
});

// Deregister a user

app.delete('/users/:name', (req, res) => {
  res.send('Successfull DELETE request removing a user');
});

app.use(express.static('public'));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
