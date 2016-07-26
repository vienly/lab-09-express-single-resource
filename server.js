'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('movie:server');
const movieRouter = require('./route/movie-route');
const AppError = require('./lib/AppError');

const port = process.env.PORT || 3000;
const server = express();

server.use(bodyParser.json());
server.use('/api/movie', movieRouter);

server.all('*', (req, res) => {
  debug('*:404');
  return AppError.error404('path not supported').respond(res);
});

module.exports = server.listen(port, () => {
  console.log('server up on port ' + port);
});
