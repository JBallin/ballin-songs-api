const jwt = require('jsonwebtoken');

const {
  APPLE_MUSIC_AUTH_KEY: privateKey,
  APPLE_MUSIC_KEY_ID: keyid,
  APPLE_TEAM_ID: iss,
} = process.env;
const algorithm = 'ES256';

const generateToken = () => {
  const options = { algorithm, keyid, expiresIn: '3d' };
  const payload = { iss };
  return jwt.sign(payload, privateKey, options);
};

module.exports = { generateToken };
