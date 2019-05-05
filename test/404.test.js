const request = require('supertest');

const app = require('../app');

describe('/NoMatchingRoute', () => {
  describe('GET', () => {
    it('should return 404', (done) => {
      request(app)
        .get('/NoMatchingRoute')
        .expect(404)
        .expect('Content-Type', /html/, done);
    });
  });
});
