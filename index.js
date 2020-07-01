const express = require('express'),
  morgan = require('morgan');
const app = express();

// List of top ten movies
let topTenMovies = [
  {},
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

app.get('/movies', (req, res) => {
  res.json(topTenMovies);
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
