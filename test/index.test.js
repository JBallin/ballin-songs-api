const request = require('supertest');

const app = require('../app');

describe('/index', () => {
  describe('GET', () => {
    it('should return HTML', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/, done);
    });
  });
});
