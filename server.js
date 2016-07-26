'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('movie:server');
const movieRouter = require('./route/movie-route');
const AppError = require('./lib/AppError');

const port = process.env.PORT || 3000;
const server = module.exports = express();

// mount bodyparser middleware
server.use(bodyParser.json());
// mount router on /api/movie mountpath
// todo: need to return movieRouter
server.use('/api/movie', movieRouter);

// if nothing matches, everything else is a not found path
server.all('*', (req, res) => {
  debug('*:404');
  return AppError.error404('path not supported').respond(res);
});

server.listen(port, () => {
  console.log('server up on port ' + port);
});
