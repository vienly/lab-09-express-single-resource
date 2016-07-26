'use strict';

const Router = require('express').Router;
const Movie = require('../model/Movie');
const AppError = require('../lib/AppError');

const movieRouter = module.exports = Router();

const movieCollection = {};

movieRouter.get('/all', (req, res) => {
  let allMovies = Object.keys(movieCollection).map((id) => {
    return movieCollection[id];
  });
  res.json(allMovies);
});

movieRouter.get('/:id', (req, res) => {
  let movie = movieCollection[req.params.id];
  if (movie) {
    return res.json(movie);
  }
  return AppError.error404('id not found').respond(res);
});

movieRouter.get('/', (req, res) => {
  return AppError.error400('GET request with no ID specified').respond(res);
});

movieRouter.post('/', (req, res) => {
  if(req.body && req.body.name && req.body.rating) {
    let movie = new Movie(req.body.name, req.body.rating);
    movieCollection[movie.id] = movie;
    if (movie)
      return res.json(movie);
    return AppError.error500('encountered problems instantiating a new movie').respond(res);
  }
  return AppError.error400('no body specified or invalid body').respond(res);
});

movieRouter.put('/:id', (req, res) => {
  let movie = movieCollection[req.params.id];
  if (movie) {
    if (req.body) {
      movie.name = req.body.name || movie.name;
      movie.rating = req.body.rating || movie.rating;
      return res.json(movie);
    }
    return AppError.error400('no body specified or invalid body').respond(res);
  }
  return AppError.error404('id not found').respond(res);
});

movieRouter.delete('/:id', (req, res) => {
  let movie = movieCollection[req.params.id];
  if (movie) {
    delete movieCollection[req.params.id];
    return res.json(movie);
  }
  return AppError.error404('id not found').respond(res);
});
