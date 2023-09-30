

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
  
    bot.sendMessage(chatId, resp);
  });


//bot.on('message', (msg) => {
//  const chatId = msg.chat.id;
//
//  // send a message to the chat acknowledging receipt of their message
//  bot.sendMessage(chatId, 'Received your message');
//});