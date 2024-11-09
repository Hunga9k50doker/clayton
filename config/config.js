require("dotenv").config();
const { _isArray } = require("../utils.js");

const settings = {
  TIME_SLEEP: process.env.TIME_SLEEP ? parseInt(process.env.TIME_SLEEP) : 8,
  MAX_THEADS: process.env.MAX_THEADS ? parseInt(process.env.MAX_THEADS) : 10,
  SKIP_TASKS: process.env.SKIP_TASKS ? JSON.parse(process.env.SKIP_TASKS.replace(/'/g, '"')) : [],
  AUTO_TASK: process.env.AUTO_TASK ? process.env.AUTO_TASK.toLowerCase() === "true" : false,
  CGI: process.env.CGI ? process.env.CGI : null,
  AUTO_PLAY_GAME: process.env.AUTO_PLAY_GAME ? process.env.AUTO_PLAY_GAME.toLowerCase() === "true" : false,
  AUTO_PLAY_GAME_STACK: process.env.AUTO_PLAY_GAME_STACK ? process.env.AUTO_PLAY_GAME_STACK.toLowerCase() === "true" : false,
  AUTO_PLAY_GAME_1204: process.env.AUTO_PLAY_GAME_1204 ? process.env.AUTO_PLAY_GAME_1204.toLowerCase() === "true" : false,
  CONNECT_WALLET: process.env.CONNECT_WALLET ? process.env.CONNECT_WALLET.toLowerCase() === "true" : false,
  DELAY_BETWEEN_REQUESTS: process.env.DELAY_BETWEEN_REQUESTS && _isArray(process.env.DELAY_BETWEEN_REQUESTS) ? JSON.parse(process.env.DELAY_BETWEEN_REQUESTS) : [1, 5],
  DELAY_START_BOT: process.env.DELAY_START_BOT && _isArray(process.env.DELAY_START_BOT) ? JSON.parse(process.env.DELAY_START_BOT) : [1, 15],
};

module.exports = settings;
