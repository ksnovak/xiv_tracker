/* The hub for all routers to pass through.
 */
import express from 'express';
import os from 'os';
import chalk from 'chalk';
import character from './character';
import utils from '../../utils';
import Errors from '../Models/Errors';

const router = express.Router();

// Initial middleware; notice that a request was made
router.use((req, res, next) => {
  utils.devLog(
    `Request for ${utils.devChalk('blue', req._parsedUrl.pathname)}${utils.devChalk(
      'green',
      req._parsedUrl.search || ''
    )}`
  );
  next();
});

router.use(/\/api\/character(s)?/i, character.router);

// Routes for api specifically
router.get('/api/', (req, res) => {
  res.send('api home');
});

router.get('/api/getUsername', (req, res) => {
  res.send({ username: os.userInfo().username });
});

// Error-handling middleware; must be the last router function
router.use((err, req, res, next) => {
  utils.devLog(utils.devChalk('red', 'Hit error handler: ') + err.name);

  let status = 500;
  let message = err;

  // If the error comes with a specific code, then that makes it a proper HTTP error.
  if (err.code) {
    status = Number(err.code);
    message = err.message;
  }
  if (err.name === 'twitch') {
    status = 400;
    message = 'Error retrieving data from Twitch';
  }
  else if (err === Errors.fileNotFound) {
    status = 404;
  }

  res.status(status);
  res.send(`Error: ${message}`);
});

module.exports = router;
