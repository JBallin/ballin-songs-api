const jwt = require('jsonwebtoken');

const keyid = 'CapExedKid';
const iss = 'CapExdTeam';
const privateKey = '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgU208KCg/doqiSzsVF5sknVtYSgt8/3oiYGbvryIRrzSgCgYIKoZIzj0DAQehRANCAAQfrvDWizEnWAzB2Hx2r/NyvIBO6KGBDL7wkZoKnz4Sm4+1P1dhD9fVEhbsdoq9RKEf8dvzTOZMaC/iLqZFKSN6\n-----END PRIVATE KEY-----';
const algorithm = 'ES256';

const generateRateLimitedToken = () => {
  const options = { algorithm, keyid, expiresIn: '3d' };
  const payload = { iss };
  return jwt.sign(payload, privateKey, options);
};

module.exports = { generateRateLimitedToken };
