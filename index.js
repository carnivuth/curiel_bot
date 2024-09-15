const TelegramBot = require("node-telegram-bot-api");

//dotenv config
require("dotenv").config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

// LAVATRICE COMMANDS
require("./src/lavatrice/lavatrice")(bot);
require("./src/lavatrice/prenota")(bot);
require("./src/lavatrice/libera")(bot);
require("./src/lavatrice/turni")(bot);

// SPESA  COMMANDS
require("./src/spesa/manca")(bot);
require("./src/spesa/mancanze")(bot);
require("./src/spesa/preso")(bot);

//ADMIN COMMANDS
require("./src/admin/admin")(bot);
require("./src/admin/rimuovimancanze")(bot);

//UTILS COMMANDS
require("./src/utils/help")(bot);
