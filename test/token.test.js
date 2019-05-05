const request = require('supertest');
const { assert } = require('chai');

const app = require('../app');

describe('/token', () => {
  describe('GET', () => {
    it('should return token string', (done) => {
      request(app)
        .get('/token')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, { body: { token } }) => {
          if (err) return done(err);
          assert.isString(token);
          assert.isNotEmpty(token);
          return done();
        });
    });
  });
});
