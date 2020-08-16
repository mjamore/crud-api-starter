const request = require('supertest');
const expect = require('chai').expect;

const app = require('../src/app');

describe('GET /api', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'hello from the /api endpoint'
      }, done);
  });
});

describe('Get all posts endpoint', () => {
  it('should respond with a 200 and a list of 0 or more posts to GET /api/posts', (done) => {
    request(app)
      .get('/api/posts')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.body).to.be.an('array').that.has.lengthOf.above(0);
        done();
      });
  });
});
