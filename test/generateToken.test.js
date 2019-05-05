const { assert } = require('chai');

const { generateToken } = require('../utils/generateToken');

describe('generateToken()', () => {
  it('should return a string', () => {
    const token = generateToken();
    assert.isString(token);
    assert.isNotEmpty(token);
  });
});
