const express = require('express');

const router = express.Router();
const songs = [];

router.get('/', (req, res) => {
  res.json({ songs });
});

module.exports = router;
