const { Bot } = require("node-telegram-bot-api");
const WasherController = require("./src/controller/washer_controller.js");
const ShopController = require("./src/controller/shop_controller.js");
const AdminController = require("./src/controller/admin_controller.js");

// get env vars for configuration
require("dotenv").config();

const bot = new Bot(process.env.TOKEN);
bot.startPolling();

bot.on('polling_error', (error) => {
  console.log(error.code);  // => 'EFATAL'
});

// send message to subscribers that bot has started
if (process.env.CURIEL_BOT_SUBSCRIBERS_CHAT_IDS) {
  var message = "curiel bot version " + process.env.CURIEL_BOT_VERSION + " started"
  for (var chatId of process.env.CURIEL_BOT_SUBSCRIBERS_CHAT_IDS.split(',')) {
    console.log(message);
    bot.api.sendMessage({chat_id: chatId, text: message});
  }
}

// whaser commands
washerController = new WasherController(bot,process.env.DATA_FOLDER);
// shop commands
shopController = new ShopController(bot,process.env.DATA_FOLDER);
// admin commands
adminController = new AdminController(bot,process.env.DATA_FOLDER,process.env.ADMIN);

