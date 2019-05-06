const request = require('supertest');
const { assert } = require('chai');

const app = require('../app');
const { generateRateLimitedToken } = require('./testUtils/generateRateLimitedToken');
const { rateLimit } = require('../utils/errors');

describe('/search', () => {
  const keys = ['id', 'attributes'];
  const attributesKeys = ['name', 'artistName', 'albumName', 'url', 'artwork', 'durationInMillis', 'previews'];
  describe('GET', () => {
    it('should return an array of songs', (done) => {
      request(app)
        .get('/search?term=drake')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, { body: { songs } }) => {
          if (err) return done(err);
          assert.isArray(songs);
          assert.lengthOf(songs, 10);
          assert.containsAllKeys(songs[0], keys);
          assert.containsAllKeys(songs[0].attributes, attributesKeys);
          return done();
        });
    });
    it('should return an empty array if there are no matching results', (done) => {
      request(app)
        .get('/search?term=bnfewhjwonwoviwefj')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, { body: { songs } }) => {
          if (err) return done(err);
          assert.isArray(songs);
          assert.isEmpty(songs);
          return done();
        });
    });
    it('should still work without a terms query', (done) => {
      request(app)
        .get('/search')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, { body: { songs } }) => {
          if (err) return done(err);
          assert.isArray(songs);
          assert.lengthOf(songs, 10);
          assert.containsAllKeys(songs[0], keys);
          assert.containsAllKeys(songs[0].attributes, attributesKeys);
          return done();
        });
    });
    it('should handle rate limit error', (done) => {
      const rateLimitedToken = generateRateLimitedToken();
      request(app)
        .get('/search?term=rihanna')
        .set('Authorization', `Bearer ${rateLimitedToken}`)
        .expect(rateLimit.status)
        .expect('Content-Type', /html/)
        .end((err, { text }) => {
          if (err) return done(err);
          assert.include(text, rateLimit.message);
          return done();
        });
    });
  });
});
