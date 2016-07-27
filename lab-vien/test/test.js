const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const testServer = require('../server');

describe('testing movie review collection server', function() {
  after(function(done) {
    testServer.close(function() {
      done();
    });
  });

  describe('testing GET functionality', function() {
    before(function(done) {
      request('localhost:3000')
        .post('/api/movie')
        .send({
          name: 'new nine',
          rating: 9
        })
        .end((err, res) => {
          this.id = res.body.id;
          done();
        });
    });

    it('GET /api/movie with a no ID should get a 400 response', function(done) {
      request('localhost:3000')
        .get('/api/movie/')
        .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.text).to.have.string('bad request');
          done();
        });
    });

    it('GET /api/movie with a bad ID should get a 404 response', function(done) {
      request('localhost:3000')
        .get('/api/movie/somebadid')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.text).to.have.string('not found');
          done();
        });
    });

    it('GET /api/movie with a valid ID should get a 200 response', function(done) {
      request('localhost:3000')
        .get('/api/movie/' + this.id)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name').to.be.a('string').and.to.match(/^new nine$/);
          expect(res.body).to.have.property('rating').to.be.a('number').and.to.eql(9);
          done();
        });
    });

    it('GET /api/movie/all should get a 200 response', function(done) {
      request('localhost:3000')
        .get('/api/movie/all')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('testing PUT functionality', function() {
    before(function(done) {
      request('localhost:3000')
        .post('/api/movie')
        .send({
          name: 'tedious ten',
          rating: 10
        })
        .end((err, res) => {
          this.id = res.body.id;
          done();
        });
    });

    it('PUT /api/movie with no ID should get a 404 response', function(done) {
      request('localhost:3000')
        .put('/api/movie/')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.text).to.have.string('not found');
          done();
        });
    });

    it('PUT /api/movie with invalid ID should get a 404 response', function(done) {
      request('localhost:3000')
        .put('/api/movie/invalidID')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.text).to.have.string('not found');
          done();
        });
    });

    it('PUT /api/movie with a no body should get a 400 response', function(done) {
      request('localhost:3000')
        .put('/api/movie/' + this.id)
        .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.text).to.have.string('bad request');
          done();
        });
    });

    it('PUT /api/movie with valid response should get back the movie with new info', function(done) {
      request('localhost:3000')
        .put('/api/movie/' + this.id)
        .send({
          name: 'eventful elevent',
          rating: 11
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name').to.be.a('string').and.to.match(/^eventful elevent$/);
          expect(res.body).to.have.property('rating').to.be.a('number').and.to.eql(11);
          done();
        });
    });
  });

  describe('testing POST functionality', function() {
    before(function(done) {
      request('localhost:3000')
        .post('/api/movie')
        .send({
          name: 'tommy looking ass twelve',
          rating: 12
        })
        .end((err, res) => {
          this.id = res.body.id;
          done();
        });
    });

    it('POST /api/movie with a no body should get a 400 response', function(done) {
      request('localhost:3000')
        .post('/api/movie/')
        .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.text).to.have.string('bad request');
          done();
        });
    });

    it('POST /api/movie with a valid body should get a 200 response', function(done) {
      request('localhost:3000')
        .post('/api/movie/')
        .send({
          name: 'tootsie turd',
          rating: 13
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name').to.be.a('string').and.to.match(/^tootsie turd$/);
          expect(res.body).to.have.property('rating').to.be.a('number').and.to.eql(13);
          done();
        });
    });
  });

  describe('testing DELETE functionality', function() {
    before(function(done) {
      request('localhost:3000')
        .post('/api/movie')
        .send({
          name: 'out of place fifteen',
          rating: 15
        })
        .end((err, res) => {
          this.id = res.body.id;
          done();
        });
    });

    it('DELETE /api/movie with an invalid ID should get a 404 response', function(done) {
      request('localhost:3000')
        .delete('/api/movie/badID')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.text).to.have.string('not found');
          done();
        });
    });

    it('DELETE /api/movie with a valid ID should get a 200 response', function(done) {
      request('localhost:3000')
        .delete('/api/movie/' + this.id)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name').to.be.a('string').and.to.match(/^out of place fifteen$/);
          expect(res.body).to.have.property('rating').to.be.a('number').and.to.eql(15);
          done();
        });
    });
  });
});
