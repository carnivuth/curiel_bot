const TelegramBot = require("node-telegram-bot-api");
const WasherController = require("./src/controller/washer_controller.js");

//dotenv config
require("dotenv").config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('polling_error', (error) => {
  console.log(error.code);  // => 'EFATAL'
});
// whaser commands
washerController = new WasherController(bot,process.env.DATA_FOLDER);
