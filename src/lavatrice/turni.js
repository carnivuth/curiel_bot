module.exports = function turni(bot) {
  bot.onText(/\/turni/, (msg, match) => {
    console.log(msg);
    var resp = "TURNI:\n";
    const chatId = msg.chat.id;

    data = percistance.loadSettings("divisione-turni.json");
    console.log(data);
  
    data.forEach((element) => {
      resp +=
        "TURNO" +
        element.turn +
        " ➡️ " +
        element.range +
        "\n";
    });
    bot.sendMessage(chatId, resp);
  });
};
