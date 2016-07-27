'use strict';

const express = require('express');
const debug = require('debug')('movie:server');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorResponse = require('./lib/error-response');
const movieRouter = require('./route/movie-route');
const AppError = require('./lib/AppError');

const port = process.argv[2] || process.env.PORT || 3000;
const server = express();

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(errorResponse());
server.use('/api/movie', movieRouter);

server.all('*', (req, res) => {
  debug('*:404');
  return AppError.error404('path not supported').respond(res);
});

module.exports = server.listen(port, () => {
  console.log('server up on port ' + port);
});
