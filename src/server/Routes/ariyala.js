import express from 'express';
import Axios from 'axios';
import RoutesUtils from './routeUtils';
import utils from '../../utils';

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.send('ariyala home');
});

async function getAriyalaList(params, next) {
  if (!params.id) {
    return [];
  }

  return 'hi these are very real results';
}

module.exports = {
  router,
  getAriyalaList
};
