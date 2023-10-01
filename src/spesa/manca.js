percistance=require("../common/percistance")
const crypto=require("crypto")
module.exports=function manca(bot){bot.onText(/\/manca (.+)/, (msg, match) => {
    console.log(msg);
    var resp;
    const chatId = msg.chat.id;
  
    oggettoMancante = match[1];
  
    mancanze = percistance.loadFromJson("mancanze.json");
    console.log(mancanze);
  
    UUID = crypto.randomUUID();
    console.log(UUID);
  
    mancanze.push({
      username: msg.from.username,
      mancanza: oggettoMancante,
      UUID: UUID,
    });
    percistance.saveToJson("mancanze.json", mancanze);
  
    resp =
      "oggetto mancante: " +
      oggettoMancante +
      " aggiunto da @" +
      msg.from.username;
    bot.sendMessage(chatId, resp);
  });
  }