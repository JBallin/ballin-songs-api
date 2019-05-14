const express = require('express');
const fetch = require('node-fetch');
const createError = require('http-errors');

const APPLE_MUSIC_SEARCH_API = 'https://api.music.apple.com/v1/catalog/us/search';

const { generateToken } = require('../utils/generateToken');
const { rateLimit } = require('../utils/errors');

const router = express.Router();

// check if authorization header has already been set (see search.test.js)
router.get('/', async ({ query, headers: { authorization } }, res, next) => {
  const url = `${APPLE_MUSIC_SEARCH_API}?types=songs&limit=10&term=${query.term}`;
  const headers = { Authorization: authorization || `Bearer ${generateToken()}` };

  fetch(url, { headers })
    .then(json => json.json())
    .then((parsed) => {
      const { message } = parsed;
      if (message) {
        const err = message === 'API capacity exceeded' ? rateLimit : /* istanbul ignore next */ { status: 500, message };
        next(createError(err.status, err.message));
      } else {
        const { songs } = parsed.results;
        res.json({ songs: songs ? songs.data : [] });
      }
    })
    .catch(/* istanbul ignore next */ err => next(err));
});

module.exports = router;
