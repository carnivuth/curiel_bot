module.exports = function lavatrice(bot) {
  bot.onText(/\/lavatrice/, (msg, match) => {
    console.log(msg);

    const chatId = msg.chat.id;
    const resp = "Aspetta, non l'ho ancora fatto il codice";

    bot.sendMessage(chatId, resp);
  });
};
