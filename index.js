const TelegramBot = require("node-telegram-bot-api");

//dotenv config
require("dotenv").config();

//cripto for random UUID
const crypto = require("crypto");

//fs for json percistency
const fs = require("fs");

const token = process.env.TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/lavatrice/, (msg, match) => {
  console.log(msg);

  const chatId = msg.chat.id;
  const resp = "Aspetta, non l'ho ancora fatto il codice";

  bot.sendMessage(chatId, resp);
});

bot.onText(/\/prenota/, (msg, match) => {
  console.log(msg);

  const chatId = msg.chat.id;
  const resp = "Aspetta, non l'ho ancora fatto il codice";

  bot.sendMessage(chatId, resp);
});

bot.onText(/\/mancanze/, (msg, match) => {
  console.log(msg);
  var resp = "in casa manca:\n";
  const chatId = msg.chat.id;

  mancanze = loadFromJson("mancanze.json");
  console.log(mancanze);
  if (mancanze.length == 0) {
    resp = "non manca niente";
    bot.sendMessage(chatId, resp);
    return;
  }
  mancanze.forEach((element) => {
    resp += element.mancanza + "\n";
  });
  bot.sendMessage(chatId, resp);
});
bot.onText(/\/manca (.+)/, (msg, match) => {
  console.log(msg);
  var resp;
  const chatId = msg.chat.id;

  oggettoMancante = match[1];

  mancanze = loadFromJson("mancanze.json");
  console.log(mancanze);

  UUID = crypto.randomUUID();
  console.log(UUID);

  mancanze.push({
    username: msg.from.username,
    mancanza: oggettoMancante,
    UUID: UUID,
  });
  saveToJson("mancanze.json", mancanze);

  resp =
    "oggetto mancante: " +
    oggettoMancante +
    " aggiunto da @" +
    msg.from.username;
    bot.sendMessage(chatId, resp);
});

function loadFromJson(file) {
  return JSON.parse(fs.readFileSync(process.env.RESOURCES_FOLDER + "/" + file));
}
function saveToJson(file, object) {
  fs.writeFileSync(
    process.env.RESOURCES_FOLDER + "/" + file,
    JSON.stringify(object)
  );
}
bot.onText(/\/preso (.+)/, (msg, match) => {
  console.log(msg);
  var resp;
  const chatId = msg.chat.id;

  oggettoPreso = match[1];

  mancanze = loadFromJson("mancanze.json");
  console.log(mancanze);
  mancanze = mancanze.filter(function (item) {
    return item.mancanza !== oggettoPreso;
  });

  saveToJson("mancanze.json", mancanze);

  resp = "mancanze aggiornate!";
  console.log(resp);

  bot.sendMessage(chatId, resp);
});

function loadFromJson(file) {
  return JSON.parse(fs.readFileSync(process.env.RESOURCES_FOLDER + "/" + file));
}
function saveToJson(file, object) {
  fs.writeFileSync(
    process.env.RESOURCES_FOLDER + "/" + file,
    JSON.stringify(object)
  );
}
