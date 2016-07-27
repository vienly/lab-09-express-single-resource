'use strict';

const Router = require('express').Router;
const Movie = require('../model/Movie');
const AppError = require('../lib/AppError');

const movieRouter = module.exports = Router();

const movieCollection = {};

movieRouter.get('/all', (req, res) => {
  try {
    let allMovies = Object.keys(movieCollection).map((id) => {
      return movieCollection[id];
    });
    res.json(allMovies);
  } catch(err) {
    return res.sendError(err); // if caught error this will return code 500 because err is not AppError
  }
});

movieRouter.get('/:id', (req, res) => {
  let movie = movieCollection[req.params.id];
  if (movie) {
    return res.json(movie);
  }
  return res.sendError(AppError.error404('id not found'));
});

movieRouter.get('/', (req, res) => {
  return res.sendError(AppError.error400('GET request with no ID specified'));
});

movieRouter.post('/', (req, res) => {
  if(Object.keys(req.body).length && req.body.name && req.body.rating) {
    try {
      let movie = new Movie(req.body.name, req.body.rating);
      movieCollection[movie.id] = movie;
      if (movie)
        return res.json(movie);
    } catch(err) {
      return res.sendError(err); // if caught error this will return code 500 because err is not AppError
    }
  }
  return res.sendError(AppError.error400('no body specified or invalid body'));
});

movieRouter.put('/:id', (req, res) => {
  let movie = movieCollection[req.params.id];
  if (movie) {
    if (Object.keys(req.body).length) { //check if there was a body
      movie.name = req.body.name || movie.name;
      movie.rating = req.body.rating || movie.rating;
      return res.json(movie);
    }
    return res.sendError(AppError.error400('no body specified or invalid body'));
  }
  return res.sendError(AppError.error404('id not found'));
});

movieRouter.delete('/:id', (req, res) => {
  let movie = movieCollection[req.params.id];
  if (movie) {
    delete movieCollection[req.params.id];
    return res.json(movie);
  }
  return res.sendError(AppError.error404('id not found'));
});
