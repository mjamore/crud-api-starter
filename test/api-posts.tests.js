const request = require('supertest');
const expect = require('chai').expect;

const app = require('../src/app');

// GET /api/posts
describe('Get all posts endpoint (GET /api/posts)', () => {
  it('should respond with a 200 and a list of 0 or more posts', (done) => {
    request(app)
    	.get('/api/posts')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array').that.has.lengthOf.at.least(0);
        done();
      });
  });
});

// GET /api/posts/id
describe('Get post by id endpoint (GET /api/posts/id)', () => {
  it('should return a 200 with a valid post object when a valid post id is provided', () => {
    request(app)
      .post('/api/posts')
      .send({ title: 'Get one 200 title', body: 'Get one 200 body' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        const postId = res.body._id;
        request(app)
          .get(`/api/posts/${postId}`)
          .set('Accept', 'application/json')
          .end((err2, res2) => {
            expect(err2).to.be.null;
            expect(res2.status).to.equal(200);
            expect(res2.body).to.have.nested.property('Item.title');
            expect(res2.body).to.have.nested.property('Item.body');
            expect(res2.body).to.have.nested.property('Item._id');
          });
      });
  });

  it('should return a 200 with an empty object when the post id is valid but does not exist', () => {
    request(app)
      .get('/api/posts/fe58d4f2-01ad-4e40-becf-d14e59251c01')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
      });
  });

  it('should return a 200 when the post id is not valid', () => {
    request(app)
      .get('/api/posts/invalid_id_value')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
      });
  });
});

// POST /api/posts
describe('Add new post endpoint (POST /api/posts)', () => {
  it('should return a 200 with the post body when a valid post is made', () => {
    request(app)
      .post('/api/posts')
      .send({ title: 'Post 200 title', body: 'Post 200 body' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('body');
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('message', 'Success');
      });
  });

  it('should return a 500 when an invalid property is present in the payload', () => {
    request(app)
      .post('/api/posts')
      .send({ title: 'Post 500 title - invalid property', body: 'Post 500 body - invalid property', fakeField: 'fake data' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(500);
      });
  });

  it('should return a 500 when a required property is missing in the payload', () => {
    request(app)
      .post('/api/posts')
      .send({ title: 'Post 500 title - missing payload' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(500);
      });
  });

  it('should return a 500 when a required property is the wrong type in the payload', () => {
    request(app)
      .post('/api/posts')
      .send({ title: 'Post 500 title - wrong type', body: true })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(500);
      });
  });
});

// PUT /api/posts/id
describe('Update a post endpoint (PUT /api/posts/id)', () => {
  it('should return a 200 and the updated object when a valid update is made', () => {
    request(app)
      .post('/api/posts')
      .send({ title: 'Update 200 title', body: 'Update 200 body' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        const postId = res.body._id;
        request(app)
          .put(`/api/posts/${postId}`)
          .send({ title: 'Test Title Altered', body: 'test body altered' })
          .end((err2, res2) => {
            expect(err2).to.be.null;
            expect(res2.status).to.equal(200);
            expect(res2.body).to.have.nested.property('Attributes.title', 'Test Title Altered');
            expect(res2.body).to.have.nested.property('Attributes.body', 'test body altered');
          });
      });
  });

  it('should return a 200 when the post id is not valid', () => {
    request(app)
      .post('/api/posts')
      .send({ title: 'Update 200 title - id not valid', body: 'Update 200 body - id not valid' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        request(app)
          .put('/api/posts/invalid_post_id')
          .send({ title: 'Test Title Altered', body: 'test body altered' })
          .end((err2, res2) => {
            expect(err2).to.be.null;
            expect(res2.status).to.equal(200);
          });
      });
  });
});

// DELETE /api/delete/id
describe('Delete a post endpoint (DELETE /api/posts/id)', () => {
  it('should return a 200 when a post is successfully deleted', () => {
    request(app)
      .post('/api/posts')
      .send({ title: 'Delete 200 title', body: 'Delete 200 body' })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        const postId = res.body._id;
        request(app)
          .delete(`/api/posts/${postId}`)
          .end((err2, res2) => {
            expect(err2).to.be.null;
            expect(res2.status).to.equal(200);
            expect(res2.body).to.have.property('message', 'Success');
          });
      });
  });

  it('should return a 200 when post id is valid but does not exist', () => {
    request(app)
      .post('/api/posts')
      .send({ title: 'Delete 200 title - id does not exist', body: 'Delete 200 body - id does not not exist' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        request(app)
          .delete('/api/posts/4987b0ff-e72a-4fbd-8bb9-4897ca71060b')
          .end((err2, res2) => {
            expect(err2).to.be.null;
            expect(res2.status).to.equal(200);
          });
      });
  });

  it('should return a 200 when the post id is not valid', () => {
    request(app)
      .post('/api/posts')
      .send({ title: 'Delete 200 title - id not valid', body: 'Delete 200 body - id not valid' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res.status).to.equal(200);
        request(app)
          .delete('/api/posts/invalid_post_id')
          .end((err2, res2) => {
            expect(err2).to.be.null;
            expect(res2.status).to.equal(200);
          });
      });
  });
});