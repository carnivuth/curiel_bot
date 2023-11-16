percistance = require("../common/percistance");
dateutils = require("../common/dateutils");
module.exports = function prenota(bot) {
  bot.onText(/\/prenota ([a-zA-Zì]+) ([1-5])/, (msg, match) => {
    console.log(msg);

    const chatId = msg.chat.id;
    var resp;
    var giorno = match[1];
    var turno = match[2];

    if (dateutils.getdaynumber(giorno) == undefined) {
      resp = "hai sbagliato il giorno, vai nel gulag";
      bot.sendMessage(chatId, resp);
      return;
    }

    giorno = dateutils.getdatefromweekday(dateutils.getdaynumber(giorno));
    turni = percistance.loadFromJson("turni"+chatId+".json");

    data = turni.filter(function (item) {
      return item.date == giorno.toLocaleDateString() && item.turn == turno;
    });

    if (data.length == 0) {
      turni.push({
        username: msg.from.username,
        date: giorno.toJSON(),
        turn: turno,
      });
      percistance.saveToJson("turni-"+chatId+".json", turni);

      resp =
        "turno: " +
        turno +
        " del giorno: " +
        giorno.toLocaleDateString() +
        " assegnato a @" +
        msg.from.username;
    } else {
      resp = "turno gia preso, vai nel gulag";
    }
    bot.sendMessage(chatId, resp);
  });
};
