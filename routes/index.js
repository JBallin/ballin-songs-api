const express = require('express');

const router = express.Router();

const title = 'Ballin Songs API';
const routes = [
  {
    endpoint: '/token',
    url: '/token',
    methods: ['GET'],
  },
];

router.get('/', (req, res) => {
  res.render('index', { title, routes });
});

module.exports = router;
