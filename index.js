const TelegramBot = require("node-telegram-bot-api");
const admin=require("./src/admin/admin")

//dotenv config
require("dotenv").config();

//cripto for random UUID
const crypto = require("crypto");

//fs for json percistency

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });


// LAVATRICE COMMANDS
require('./src/lavatrice/lavatrice')(bot);
require('./src/lavatrice/prenota')(bot);



// SPESA  COMMANDS
require('./src/spesa/manca')(bot);
require('./src/spesa/mancanze')(bot);
require('./src/spesa/preso')(bot);

//ADMIN COMMANDS
require('./src/admin/admin')(bot);
