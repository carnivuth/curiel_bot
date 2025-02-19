const TelegramBot = require("node-telegram-bot-api");
const WasherController = require("./src/controller/washer_controller.js");
const ShopController = require("./src/controller/shop_controller.js");
const AdminController = require("./src/controller/admin_controller.js");

// get env vars for configuration
require("dotenv").config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on('polling_error', (error) => {
  console.log(error.code);  // => 'EFATAL'
});

// whaser commands
washerController = new WasherController(bot,process.env.DATA_FOLDER);
// shop commands
shopController = new ShopController(bot,process.env.DATA_FOLDER);
// admin commands
adminController = new AdminController(bot,process.env.DATA_FOLDER,process.env.ADMIN);
