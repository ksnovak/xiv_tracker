import chalk from 'chalk';

export default {
  devLog(message) {
    if (process.env.NODE_ENV === 'dev') {
      console.log(message);
    }
  },

  devChalk(color, message) {
    if (message === undefined) return chalk.keyword(color);
    return chalk.keyword(color)(message);
  },
};
