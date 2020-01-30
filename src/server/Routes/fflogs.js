import express from 'express';
import axios from 'axios';
import RoutesUtils from './routeUtils';
import utils from '../../utils';

require('dotenv').config();

const router = express.Router();

const fflogsBaseRequest = axios.create({
  baseURL: 'https://www.fflogs.com/v1/',
  params: {
    api_key: process.env.FFLOGS_PUBLIC
  }
});

router.get('/', async (req, res, next) => {
  res.send('fflogs home');
});

router.get('/test', async (req, res, next) => {
  res.send(await fflogsLookup('report/fights/RxLkPmNQdz6HanpB?translate=false', next));
});

router.get('/character', async (req, res, next) => {
  res.send(await getFflogsCharacter(req.query));
});

// Core fflogs call to be made by any of the routes
async function fflogsLookup(url, params, next) {
  return fflogsBaseRequest({
    method: 'get',
    url
  })
    .then((res) => {
      console.log('im in here');
      return res.data;
    })
    .catch(
      err =>
        // console.log(err);
        `Errrorrrrr ${err}`
    );
}

async function getFflogsCharacter(params, next) {
  const { name, server, region } = params;
  if (!name || !server) {
    return [];
  }

  return fflogsLookup(`rankings/character/${name}/${server}/${region || 'na'}`);
}

module.exports = {
  router,
  getFflogsCharacter
};
