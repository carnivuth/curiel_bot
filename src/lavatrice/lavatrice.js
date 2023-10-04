module.exports = function lavatrice(bot) {
  bot.onText(/\/lavatrice/, (msg, match) => {
    console.log(msg);
    var resp = "PRENOTAZIONI:\n";
    const chatId = msg.chat.id;

    data = percistance.loadFromJson("turni.json");
    console.log(data);
    if (data.length == 0) {
      resp = "non ci sono prenotazioni";
      bot.sendMessage(chatId, resp);
      return;
    }
    data.forEach((element) => {
      resp +=
        "@" +
        element.username +
        " ha prenotato " +
        element.date +
        " il turno " +
        element.turn +
        "\n";
    });
    bot.sendMessage(chatId, resp);
  });
};
