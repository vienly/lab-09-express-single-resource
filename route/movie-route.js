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
  if(movie) {
    return res.json(movie);
  }
  return AppError.error404('id not found').respond(res);
});

movieRouter.get('/', (req, res) => {
  return AppError.error400('GET request with no ID specified').respond(res);
});

movieRouter.post('/', (req, res) => {

});
