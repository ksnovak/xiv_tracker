import express from 'express';
import axios from 'axios';
import RoutesUtils from './routeUtils';
import utils from '../../utils';
import FflogsCharacter from '../Models/FflogsCharacter';

require('dotenv').config();

const router = express.Router();

const baseRequest = axios.create({
  baseURL: 'https://www.fflogs.com/v1/',
  params: {
    api_key: process.env.FFLOGS_PUBLIC
  }
});

// Core fflogs call to be made by any of the routes
async function makeRequest(url, params) {
  return baseRequest({
    method: 'get',
    url
  })
    .then(res => res.data)
    .catch((err) => {
      // For now, any errored request will just return an empty object.
      console.log(`BaseReq err: ${err}`);
      return {};
    });
}

// Look up a specified character
async function characterLookup(name, server, region) {
  const char = await makeRequest(`rankings/character/${name}/${server}/${region}`);
  return new FflogsCharacter(char);
}

// Look up multiple characters at once
async function batchRequest(names, region) {
  return Promise.all(
    names
      // Validate the entries, only taking in ones that have both a name and a server
      .filter((lookup) => {
        console.log('filter');
        const { name, server } = lookup;
        return !!(name && server);
      })
      // Go through each valid entry, and perform an individual lookup
      .map(async (lookup) => {
        console.log('map');
        const { name, server } = lookup;
        return characterLookup(name, server, region);
      })
  );
}

router.get('/', async (req, res) => {
  res.send('fflogs home');
});

// Look up an individual character, given their Name, Server, and Region
router.get('/character', async (req, res) => {
  const { name, server, region } = req.query;
  if (!name || !server) {
    return [];
  }

  res.send(await characterLookup(name, server, region || 'na'));
});

// Look up a batch of names (e.g. a whole party), formatted as "Firstname Lastname@Server"
router.get('/batch', async (req, res) => {
  const names = req.query.name;
  const region = req.query.region || 'na';
  // Make sure there's at least some name entered
  if (!names) {
    return [];
  }

  // Split the querystring into an array of Names and Servers
  const lookups = names.map((character) => {
    const [name, server] = character.split('@');
    return { name, server };
  });

  // Perform the batch lookup
  res.send(await batchRequest(lookups, region));
});

module.exports = {
  router
};
