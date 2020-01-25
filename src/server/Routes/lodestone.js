import express from 'express';
import { LODESTONE_URL, LodestoneParser } from 'lodestone-parser';
import Axios from 'axios';
import RoutesUtils from './routeUtils';
import utils from '../../utils';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const results = await getLodestoneCharacter(req.query, next);
  res.send(results);
});

async function getLodestoneCharacter(params, next) {
  if (!params.id) {
    return [];
  }

  const character = await Axios.get(LODESTONE_URL.character + params.id).then((res) => {
    const parser = new LodestoneParser(res.data);
    const char = parser.character();

    return {
      info: char.basicInfo(), // Name, server, DC, title, bio, portrait & avatar images
      jobs: char.jobs(), // All jobs, their level and exp
      gear: char.gear(), // Array of objects, each with item details, incl. stats and materia.
      attributes: char.attributes() // Core stat breakdown
    };
  });

  return character;
}

module.exports = {
  router,
  getLodestoneCharacter
};
