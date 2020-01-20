import axios from 'axios';
import fs from 'fs';
import Errors from '../Models/Errors';
import utils from '../../utils';

require('dotenv').config();

module.exports = {
  // baseRequest: axios.create({
  //   baseURL: 'https://api.twitch.tv',
  //   headers: {
  //     'Client-ID': process.env.TWITCH_CLIENT_ID
  //   }
  // }),
  // async makeTwitchRequest({ verb, uri, headers, params }) {
  //   utils.devLog('Calling Twitch at ' + utils.devChalk('blue', uri) + ' with ' + utils.devChalk('yellow', JSON.stringify(params)))
  //   try {
  //     return await this.baseRequest({
  //       method: verb || 'get',
  //       url: uri,
  //       headers,
  //       params
  //     });
  //   }
  //   catch (err) {
  //     throw err;
  //   }
  // },
  // // Twitch's API rate limits say how many more requests we can make, we have to keep track of it in order to avoid unexpected errors
  // rateLimit: {
  //   limit: null,
  //   remaining: null,
  //   reset: null
  // },
  // updateRateLimit(headers) {
  //   this.rateLimit.limit = Number(headers['ratelimit-limit']);
  //   this.rateLimit.remaining = Number(headers['ratelimit-remaining']);
  //   this.rateLimit.reset = Number(headers['ratelimit-reset']);
  // },
  // // See if we have exceeded Twitch's API limit. This is a really rough guess.
  // // If we have rateLimit details set, and it says we have no Remaining requests, and that there is still time until the Reset, then we consider it exceeded
  // isRateLimitExceeded() {
  //   const timeTillReset = this.rateLimit.reset - parseInt(Date.now() / 1000, 10);
  //   return (
  //     this.rateLimit.remaining != null
  //     && this.rateLimit.remaining < 1
  //     && this.rateLimit.reset != null
  //     && timeTillReset > 1
  //   );
  // }
};
