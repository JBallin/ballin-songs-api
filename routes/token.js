const express = require('express');

const router = express.Router();
const token = '';

router.get('/', (req, res) => {
  res.json({ token });
});

module.exports = router;
