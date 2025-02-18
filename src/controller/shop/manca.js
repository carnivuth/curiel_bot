percistance=require("../common/percistance")
module.exports=function manca(bot){bot.onText(/\/manca (.+)/, (msg, match) => {
    console.log(msg);
    var resp;
    const chatId = msg.chat.id;

    oggettoMancante = match[1];

    mancanze = percistance.loadFromJson("mancanze-"+chatId+".json");
    console.log(mancanze);

    //check for
    data=mancanze.filter(function (item) {
      return item.mancanza == oggettoMancante;
    });

    if(data.length== 0){
      mancanze.push({
        username: msg.from.username,
        mancanza: oggettoMancante,
      });
      percistance.saveToJson("mancanze-"+chatId+".json", mancanze);

    resp =
      "oggetto mancante: " +
      oggettoMancante +
      " aggiunto da @" +
      msg.from.username;
    }else{
      resp =
      "oggetto gia presente! vai easy"
    }


    bot.sendMessage(chatId, resp);
  });
  }
