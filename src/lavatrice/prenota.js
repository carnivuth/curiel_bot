percistance = require("../common/percistance");
module.exports = function prenota(bot) {
  bot.onText(/\/prenota ([a-zA-Z]+) ([0-9])/, (msg, match) => {
    console.log(msg);

    const chatId = msg.chat.id;
    var resp;
    var giorno = match[1];
    var turno = match[2];

    if (getdaynumber(giorno) == undefined) {
      resp = "hai sbagliato il giorno, vai nel gulag";
      bot.sendMessage(chatId, resp);
      return;
    }

    giorno = getdatefromweekday(getdaynumber(giorno));
    turni = percistance.loadFromJson("turni.json");

    data = turni.filter(function (item) {
      return item.date == giorno.toLocaleDateString() && item.turn == turno;
    });

    if (data.length == 0) {
      turni.push({
        username: msg.from.username,
        date: giorno.toLocaleDateString(),
        turn: turno,
      });
      percistance.saveToJson("turni.json", turni);

      resp =
        "turno: " +
        turno +
        " del giorno: " +
        giorno.toString() +
        " assegnato a @" +
        msg.from.username;
    } else {
      resp = "turno gia preso, vai nel gulag";
    }
    bot.sendMessage(chatId, resp);
  });
};
const weekdays = new Map();

weekdays.set("lunedi", 1);
weekdays.set("martedi", 2);
weekdays.set("mercoledi", 3);
weekdays.set("giovedi", 4);
weekdays.set("venerdi", 5);
weekdays.set("sabato", 6);
weekdays.set("domenica", 0);

function getdaynumber(day) {
  return weekdays.get(day);
}
function getdatefromweekday(day) {
  date = new Date();
  while (day != date.getDay()) {
    date.setDate(date.getDate() + 1);
  }
  return date;
}
