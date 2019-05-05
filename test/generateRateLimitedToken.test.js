const { assert } = require('chai');

const { generateRateLimitedToken } = require('./testUtils/generateRateLimitedToken');

describe('generateRateLimitedToken()', () => {
  it('should return a string', () => {
    const token = generateRateLimitedToken();
    assert.isString(token);
    assert.isNotEmpty(token);
  });
});
