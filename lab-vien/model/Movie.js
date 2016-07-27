'use strict';

const uuid = require('node-uuid');
const AppError = require('../lib/AppError');

module.exports = function Movie(name, rating) {
  this.id = uuid.v1();
  if (!name || !rating)
    throw AppError.error500('attempted to construct new Movie with missing properties');
  this.name = name;
  this.rating = rating;
};
