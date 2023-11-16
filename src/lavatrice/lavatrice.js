module.exports = function lavatrice(bot) {
  bot.onText(/\/lavatrice/, (msg, match) => {
    console.log(msg);
    var resp = "PRENOTAZIONI:\n";
    const chatId = msg.chat.id;
    //check for yesterday note
    yesterday= new Date()
    yesterday.setDate(new Date().getDate()-1)

    reservations = percistance.loadFromJson("turni-"+chatId+".json");
    console.log(reservations);
    

    data = reservations.filter(function (item) {
      return new Date(item.date).getTime() >  yesterday.getTime();
    });

    if (data.length == 0) {
      resp = "non ci sono prenotazioni";
      bot.sendMessage(chatId, resp);
      return;
    }
    // data preparation
    data.forEach((element) => {
      resp +=
        "@" +
        element.username +
        " ha prenotato " +
        new Date(element.date).toLocaleDateString() +
        " il turno " +
        element.turn +
        "\n";
    });
    bot.sendMessage(chatId, resp);
  });
};
