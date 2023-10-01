require("../common/percistance")
module.exports = function mancanze(bot) {
  bot.onText(/\/mancanze/, (msg, match) => {
    console.log(msg);
    var resp = "in casa manca:\n";
    const chatId = msg.chat.id;

    data = percistance.loadFromJson("mancanze.json");
    console.log(data);
    if (data.length == 0) {
      resp = "non manca niente";
      bot.sendMessage(chatId, resp);
      return;
    }
    data.forEach((element) => {
      resp += element.mancanza + "\n";
    });
    bot.sendMessage(chatId, resp);
  });
};
