import express from 'express';
import axios from 'axios';
import RoutesUtils from './routeUtils';
import utils from '../../utils';
import FflogsCharacter from '../Models/FflogsCharacter';
import Tier from '../Models/Tier';

require('dotenv').config();

const router = express.Router();

const baseRequest = axios.create({
  baseURL: 'https://www.fflogs.com/v1/',
  params: {
    api_key: process.env.FFLOGS_PUBLIC,
  },
});

const v2Request = axios.create({
  url: 'https://www.fflogs.com/api/v2/client/',
  headers: { Authorization: `Bearer ${process.env.FFLOGS_BEARER_TOKEN}`}
})


const currentTier = 44; // 38=Promise, 44=Asphodelos
const currentPartition = null; //Upon patch release, partitioning occurs. Null = current patch ONLY. Number = specific previous partition
const currentExpansion = 4;
let currentTierData;
let serverData;

// Core fflogs call to be made by any of the routes
async function makeRequest(url, params = {}) {
  return baseRequest({
    method: 'get',
    url,
    params
  })
    .then(res => res.data)
    .catch((err) => {
      // For now, any errored request will just return an empty object.
      console.log(`BaseReq err: ${err}; for request (${url})`);
      return {};
    });
}

async function makev2Request(query) {
  return v2Request({
    method: 'get',
    data: { query }
  })
    .then(res => res.data.data )
    .catch((err) => {
      // For now, any errored request will just return an empty object.
      console.log(`BaseReq err: ${err}; for request (${url})`);
      return {};
    });

}

// Get base information for the specified tier (i.e. boss names and encounter numbers)
async function configLookup(id) {
  const results = await makev2Request(`
    query {
      tierDetails: worldData { zone (id: ${id} ) {
        id, 
        name, 
        encounters {
          id, name
        },
        partitions  {
          id, name, default
        }
      } }

      serverDetails: worldData {
        regions {
          id, compactName, name, servers { data { name } }
        }
      }
    }`
  )

  const tierData = results.tierDetails.zone;
  const regionData = results.serverDetails.regions;


  if (tierData || regionData) {

    return {
      tier: new Tier(tierData),

      regions: regionData.map(({compactName, name, servers}) => {
        return {
          compactName,
          name, 
          servers: servers.data.map(server => server.name)
        }
      })
    }
  }

  return {};
}

// Look up a specified character
async function characterLookup(name, server, region, partition) {
  const char = await makeRequest(
    `rankings/character/${name}/${server}/${region}`,
    { partition }
  );

  return new FflogsCharacter(char);
}

// Look up multiple characters at once
async function batchRequest(names, region, partition) {
  return Promise.all(
    names
      // Validate the entries, only taking in ones that have both a name and a server
      .filter((lookup) => {
        const { name, server } = lookup;
        return !!(name && server);
      })
      // Go through each valid entry, and perform an individual lookup
      .map(async (lookup) => {
        const { name, server } = lookup;
        return characterLookup(name, server, region, partition);
      })
  );
}

router.get('/', async (req, res) => {
  res.send('fflogs home');
});

router.get('/config', async (req, res) => {
  const { tier = currentTier } = req.query;
  let placeholderData;

  // If we either have no data at all, or are looking for custom data, then do a lookup.
  if (!currentTierData || tier != currentTier) {
    placeholderData = await configLookup(tier);

    // If the data retrieved is for the current tier, save it for later
    if (tier == currentTier) {
      currentTierData = placeholderData;
    }
  }


  res.send(placeholderData || currentTierData);
});

// Look up an individual character, given their Name, Server, and Region
router.get('/character', async (req, res) => {
  const { name, server, region = 'na', partition = currentPartition } = req.query;
  if (!name || !server) {
    return [];
  }

  res.send(await characterLookup(name, server, region, partition));
});

// Look up a batch of names (e.g. a whole party), formatted as "Firstname Lastname@Server"
router.get('/batch', async (req, res) => {
  const { name: names, region = 'na', partition = currentPartition } = req.query;

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
  res.send(await batchRequest(lookups, region, partition));
});

module.exports = {
  router,
};
