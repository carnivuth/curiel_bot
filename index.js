

const TelegramBot = require('node-telegram-bot-api');

//dotenv config
require("dotenv").config();

const token = process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/lavatrice/, (msg, match) => {
    console.log(msg)

  const chatId = msg.chat.id;
  const resp = 'lavatrice'; 

  bot.sendMessage(chatId, resp);
});

bot.onText(/\/prenota/, (msg, match) => {
    console.log(msg)
    console.log(match[1])
  
    const chatId = msg.chat.id;
    const resp = "prenotato"; 
  
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
  });

// Listen for any kind of message. There are different kinds of
// messages.
//bot.on('message', (msg) => {
//  const chatId = msg.chat.id;
//
//  // send a message to the chat acknowledging receipt of their message
//  bot.sendMessage(chatId, 'Received your message');
//});