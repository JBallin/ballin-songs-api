const express = require('express');

const { generateToken } = require('../utils/generateToken');

const router = express.Router();
const token = generateToken();

router.get('/', (req, res) => {
  res.json({ token });
});

module.exports = router;
