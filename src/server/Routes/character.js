import express from 'express';
import RoutesUtils from './routeUtils';
import utils from '../../utils';

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.send('character home');
});

router.get('/lodestone', async (req, res, next) => {
  const results = await getLodestoneCharacter(req.query, next);
  res.send(results);
});

async function getLodestoneCharacter(params, next) {
  if (!params.server || !params.name) {
    return [];
  }

  return `Yes hello here is your data for ${params.name} @ ${params.server}`;
}

module.exports = {
  router,
  getLodestoneCharacter
};
