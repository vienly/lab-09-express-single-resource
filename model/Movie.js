'use strict';

const uuid = require('node-uuid');

module.exports = function Movie(name, rating) {
  this.id = uuid.v1();
  this.name = name;
  this.rating = rating;
};
